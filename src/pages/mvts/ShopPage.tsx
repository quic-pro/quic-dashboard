import {ChangeEvent, useEffect, useState} from 'react';

import Loader from '../../components/Loader';
import {POOL_SIZE} from '../../constants/rootRouter';
import {
    useAvailableForMintCodes,
    useBlockedCodes,
    useHeldCodes,
    useMint,
    useMintPrice,
} from '../../hooks/mvts/rootRouter';
import {roundBigNumber} from '../../utils/bigNumber';
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
    const [isLoading, setIsLoading] = useState(true);
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

    const mintPrice = useMintPrice();
    const blockedCodes = useBlockedCodes();
    const heldCodes = useHeldCodes();
    const availableForMintCodes = useAvailableForMintCodes();
    const mint = useMint();

    useEffect(() => {
        if (blockedCodes.data && heldCodes.data && availableForMintCodes.data) {
            codesStatus.forEach((codesStatus) => {
                codesStatus.isMinted = ((!codesStatus.isAvailableForMint && !codesStatus.isBlocked) || codesStatus.isHeld);
            });
            setCodesStatus(codesStatus);
            setIsLoading(false);
        }
    }, [blockedCodes, heldCodes, availableForMintCodes]);

    useEffect(() => {
        if (!blockedCodes.data) {
            return;
        }

        blockedCodes.data.forEach((status, index) => codesStatus[index].isBlocked = status);
    }, [blockedCodes]);

    useEffect(() => {
        if (!heldCodes.data) {
            return;
        }

        heldCodes.data.forEach((status, index) => codesStatus[index].isHeld = status);
    }, [heldCodes]);

    useEffect(() => {
        if (!availableForMintCodes.data) {
            return;
        }

        availableForMintCodes.data.forEach((status, index) => codesStatus[index].isAvailableForMint = status);
    }, [availableForMintCodes]);

    const handleResetFilters = () => {
        setFilterBlocked(true);
        setFilterHeld(true);
        setFilterAvailable(true);
        setFilterMinted(true);
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

        filteredCodes.forEach((code) => {
            const a = +code.toString()[0];
            const b = +code.toString()[1];

            if (!tree[a]) {
                tree[a] = [];
            }
            if (!tree[a][b]) {
                tree[a][b] = [];
            }

            tree[a][b].push(code);
        });

        return tree;
    };

    return (
        <BasePage title={TITLE} description={DESCRIPTION}>
            <div>
                <span>Price: </span>
                <span>{mintPrice.data && roundBigNumber(mintPrice.data)}</span>
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
                    {enteredCode && <button onClick={() => mintPrice.data && mint(enteredCode, {value: mintPrice.data})} className="border">Mint</button>}
                </div>
                <span className="text-xs">*The code consists of three digits and cannot start with a zero</span>
            </div>
            <div>
                <div className="flex flex-row items-start my-3 gap-3">
                    Filters:
                    <div className="flex flex-row gap-3 items-center flex-wrap">
                        <button
                            onClick={handleResetFilters}
                            className="border rounded-md px-1 h-[30px] w-[75px] text-xs
                            bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                            dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
                        >
                                All
                        </button>
                        <button
                            onClick={() => setFilterBlocked(!filterBlocked)}
                            className="border rounded-md px-1 h-[30px] w-[75px] text-xs
                            bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                            dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
                        >
                                Blocked
                        </button>
                        <button
                            onClick={() => setFilterHeld(!filterHeld)}
                            className="border rounded-md px-1 h-[30px] w-[75px] text-xs
                            bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                            dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
                        >
                                Held
                        </button>
                        <button
                            onClick={() => setFilterAvailable(!filterAvailable)}
                            className="border rounded-md px-1 h-[30px] w-[75px] text-xs
                            bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                            dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
                        >
                                Available
                        </button>
                        <button
                            onClick={() => setFilterMinted(!filterMinted)}
                            className="border rounded-md px-1 h-[30px] w-[75px] text-xs
                            bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                            dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
                        >
                                Minted
                        </button>
                    </div>
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
                                        <summary>{indexA}**</summary>
                                        {codesA.map((codesB, indexB) => {
                                            if (codesB.length === 0) {
                                                return null;
                                            }

                                            return (
                                                <details key={indexB} className="ml-8">
                                                    <summary>{indexA}{indexB}*</summary>
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
                                                            onClick={() => mintPrice.data && mint(code, {value: mintPrice.data})}
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
