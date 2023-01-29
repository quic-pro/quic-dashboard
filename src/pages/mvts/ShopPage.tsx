import {BigNumber} from 'ethers';
import {ChangeEvent, useLayoutEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

import Loader from '../../components/Loader';
import {POOL_SIZE} from '../../constants/rootRouter';
import {notificationListState, NotificationType} from '../../state/app';
import {rootRouterState} from '../../state/dashboard/mvts';
import {roundBigNumber} from '../../utils/bigNumber';
import {getErrorMessage} from '../../utils/getErrorMessage';
import BasePage from './BasePage';


const TITLE = 'Shop';
const DESCRIPTION = 'On this page, you can buy a code in the root router and then on the Settings page configure it.';


type codesStatus = {
    isBlocked: boolean;
    isHeld: boolean;
    isAvailableForMint: boolean;
    isMinted: boolean;
};


export default function ShopPage() {
    const [notificationList, setNotificationList] = useRecoilState(notificationListState);
    const rootRouter = useRecoilValue(rootRouterState);

    const [isLoading, setIsLoading] = useState(true);
    const [mintPrice, setMintPrice] = useState<BigNumber | null>(null);
    const [codesStatus, setCodesStatus] = useState(Array.from({length: POOL_SIZE}, () => ({
        isBlocked: false,
        isHeld: false,
        isAvailableForMint: false,
        isMinted: false,
    } as codesStatus)));
    const [enteredCode, setEnteredCode] = useState<number | null>(null);
    const [filterBlocked, setFilterBlocked] = useState(true);
    const [filterHeld, setFilterHeld] = useState(true);
    const [filterAvailable, setFilterAvailable] = useState(true);
    const [filterMinted, setFilterMinted] = useState(true);

    useLayoutEffect(() => {
        loadData();
    }, [rootRouter]);

    const loadData = () => {
        if (!rootRouter) {
            return;
        }

        Promise.all([
            new Promise<void>((resolve) => {
                rootRouter.mintPrice()
                    .then(setMintPrice)
                    .catch((error) => {
                        setNotificationList([...notificationList, {
                            type: NotificationType.ERROR,
                            context: `Failed to get mint price: ${getErrorMessage(error)}.`,
                        }]);
                    })
                    .finally(resolve);
            }),
            new Promise<void>((resolve) => {
                rootRouter.getBlockedCodes()
                    .then((blockedCodes) => {
                        blockedCodes.forEach((status, index) => codesStatus[index].isBlocked = status);
                    })
                    .catch((error) => {
                        setNotificationList([...notificationList, {
                            type: NotificationType.ERROR,
                            context: `Failed to get blocked codes: ${getErrorMessage(error)}.`,
                        }]);
                    })
                    .finally(resolve);
            }),
            new Promise<void>((resolve) => {
                rootRouter.getHeldCodes()
                    .then((heldCodes) => {
                        heldCodes.forEach((status, index) => codesStatus[index].isHeld = status);
                    })
                    .catch((error) => {
                        setNotificationList([...notificationList, {
                            type: NotificationType.ERROR,
                            context: `Failed to get held codes: ${getErrorMessage(error)}.`,
                        }]);
                    })
                    .finally(resolve);
            }),
            new Promise<void>((resolve) => {
                rootRouter.getAvailableForMintCodes()
                    .then((availableForMintCodes) => {
                        availableForMintCodes.forEach((status, index) => codesStatus[index].isAvailableForMint = status);
                    })
                    .catch((error) => {
                        setNotificationList([...notificationList, {
                            type: NotificationType.ERROR,
                            context: `Failed to get available for mint codes: ${getErrorMessage(error)}.`,
                        }]);
                    })
                    .finally(resolve);
            }),
        ])
            .finally(() => {
                codesStatus.forEach((codesStatus) => {
                    codesStatus.isMinted = ((!codesStatus.isAvailableForMint && !codesStatus.isBlocked) || codesStatus.isHeld);
                });
                setCodesStatus(codesStatus);
                setIsLoading(false);
            });
    };

    const handleResetFilters = () => {
        setFilterBlocked(true);
        setFilterHeld(true);
        setFilterAvailable(true);
        setFilterMinted(true);
    };

    const handleClickOnCode = (code: number) => {
        rootRouter?.mint(code, {value: mintPrice!})
            .then(() => {
                setNotificationList([...notificationList, {
                    type: NotificationType.INFORMATION,
                    context: `Code ${code}: Minting transaction sent.`,
                }]);
            })
            .catch((error) => {
                setNotificationList([...notificationList, {
                    type: NotificationType.ERROR,
                    context: `Failed to send transaction: ${getErrorMessage(error)}.`,
                }]);
            });
    };

    const handleInputCode = (event: ChangeEvent<HTMLInputElement>) => {
        const codeInput = event.target.value.replace(/\D/g, '');
        const code = Number(codeInput);

        if ((codeInput.length !== 3) || (code < 0) || (code >= POOL_SIZE) || !codesStatus[code].isAvailableForMint) {
            setEnteredCode(null);
        } else {
            setEnteredCode(code);
        }
    };

    const filterCodes = () => {
        const filteredCodes: number[] = [];
        for (let code = 100; code < POOL_SIZE; ++code) {
            if (
                (codesStatus[code].isBlocked && filterBlocked) ||
                (codesStatus[code].isHeld && filterHeld) ||
                (codesStatus[code].isAvailableForMint && filterAvailable) ||
                (codesStatus[code].isMinted && filterMinted)
            ) {
                filteredCodes.push(code);
            }
        }

        return filteredCodes;
    };

    const splitCodes = () => {
        const filteredCodes = filterCodes();

        const tree: number[][][] = [];
        for (let i = 0; i < 10; ++i) {
            tree.push([]);
            for (let j = 0; j < 10; ++j) {
                tree[i].push([]);
            }
        }

        filteredCodes.forEach((code) => {
            const a = +code.toString()[0];
            const b = +code.toString()[1];

            tree[a][b].push(code);
        });

        return tree;
    };

    return (
        <BasePage title={TITLE} description={DESCRIPTION}>
            <div>
                <span>Price: </span>
                <span>{mintPrice && roundBigNumber(mintPrice)}</span>
            </div>
            <div className="flex flex-col">
                <div>
                    <span>Input number:</span>
                    <input
                        className="ml-2 p-1 pl-2"
                        type="text"
                        placeholder="Number"
                        onChange={handleInputCode}
                    />
                    {enteredCode && <button onClick={() => handleClickOnCode(enteredCode)} className="border">Mint</button>}
                </div>
                <span className="text-xs">*The code consists of three digits and cannot start with a zero</span>
            </div>
            <div>
                <div>
                    Filters:
                    <button onClick={() => setFilterBlocked(!filterBlocked)} className="border p-1 m-1">Blocked</button>
                    <button onClick={() => setFilterHeld(!filterHeld)} className="border p-1 m-1">Held</button>
                    <button onClick={() => setFilterAvailable(!filterAvailable)} className="border p-1 m-1">Available
                    </button>
                    <button onClick={() => setFilterMinted(!filterMinted)} className="border p-1 m-1">Minted</button>
                    <button onClick={handleResetFilters} className="border p-1 m-1">All</button>
                </div>
                {isLoading
                    ? <Loader/>
                    : (
                        <div
                            className="flex flex-col">
                            {splitCodes().map((codesA, indexA) => {
                                if (codesA.length === 0) {
                                    return null;
                                }

                                return (
                                    <details key={indexA}>
                                        <summary>{indexA}--</summary>
                                        {codesA.map((codesB, indexB) => {
                                            if (codesB.length === 0) {
                                                return null;
                                            }

                                            return (
                                                <details key={indexB} className="ml-8">
                                                    <summary>{indexA}{indexB}-</summary>
                                                    {codesB.map((code) => {
                                                        let bgColor = '';
                                                        if (codesStatus[code].isBlocked) {
                                                            bgColor = 'bg-red-300';
                                                        } else if (codesStatus[code].isHeld) {
                                                            bgColor = 'bg-blue-300';
                                                        } else if (codesStatus[code].isAvailableForMint) {
                                                            bgColor = 'bg-green-300';
                                                        }

                                                        return <button
                                                            key={code}
                                                            disabled={!codesStatus[code].isAvailableForMint}
                                                            onClick={() => handleClickOnCode(code)}
                                                            className={`w-full border rounded-lg h-10 ${bgColor}`}
                                                        >{code.toString().padStart(3, '0')}</button>;
                                                    })}
                                                </details>
                                            );
                                        })}
                                    </details>
                                );
                            })}
                        </div>
                    )
                }
            </div>
        </BasePage>
    );
}
