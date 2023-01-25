import {BigNumber} from 'ethers';
import {ChangeEvent, useLayoutEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

import Loader from '../../components/Loader';
import {notificationListState, NotificationType} from '../../state/app';
import {rootRouterState} from '../../state/dashboard/mvts';
import {getErrorMessage} from '../../utils/getErrorMessage';
import {roundBalance} from '../../utils/wallet';
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
    const [codesStatus, setCodesStatus] = useState(Array.from({length: 1000}, () => ({
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

    const handleClickOnCode = (code: number) => {
        rootRouter?.mint(code, {value: mintPrice!})
            .then(() => {
                setNotificationList([...notificationList, {
                    type: NotificationType.SUCCESS,
                    context: `Code ${code} minted`,
                }]);
            })
            .catch((error) => {
                setNotificationList([...notificationList, {
                    type: NotificationType.ERROR,
                    context: `Failed to mint code: ${getErrorMessage(error)}.`,
                }]);
            });
    };

    const handleInputCode = (event: ChangeEvent<HTMLInputElement>) => {
        const codeInput = event.target.value.replace(/\D/g, '');
        const code = Number(codeInput);

        if ((codeInput.length !== 3) || (code < 0) || (code >= 1000) || !codesStatus[code].isAvailableForMint) {
            setEnteredCode(null);
        } else {
            setEnteredCode(code);
        }
    };

    return (
        <BasePage title={TITLE} description={DESCRIPTION}>
            <div>
                <span>Price: </span>
                <span>{mintPrice && roundBalance(mintPrice)}</span>
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
                </div>
                {isLoading
                    ? <Loader/>
                    : (
                        <div
                            className="grid grid-cols-5 lg:grid-cols-10 xl:grid-cols-15 2xl:grid-cols-20 gap-2 justify-items-stretch">
                            {codesStatus.map((codeStatus, code) => {
                                let bgColor = '';
                                if (codeStatus.isBlocked) {
                                    bgColor = 'bg-red-300';
                                } else if (codeStatus.isHeld) {
                                    bgColor = 'bg-blue-300';
                                } else if (codeStatus.isAvailableForMint) {
                                    bgColor = 'bg-green-300';
                                }

                                if (
                                    (codeStatus.isBlocked && filterBlocked) ||
                                    (codeStatus.isHeld && filterHeld) ||
                                    (codeStatus.isAvailableForMint && filterAvailable) ||
                                    (codeStatus.isMinted && filterMinted)
                                ) {
                                    return <button
                                        key={code}
                                        disabled={!codeStatus.isAvailableForMint}
                                        onClick={() => handleClickOnCode(code)}
                                        className={`w-full border rounded-lg h-10 ${bgColor}`}
                                    >{code.toString().padStart(3, '0')}</button>;
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    )
                }
            </div>
        </BasePage>
    );
}
