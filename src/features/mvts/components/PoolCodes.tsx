import {CodeStatus} from '@mvts/contract-interfaces-js';
import {ROOT_ROUTER_POOL_SIZE as POOL_SIZE} from '@mvts/contract-interfaces-js/dist/constants';
import {ChangeEvent, useState} from 'react';
import {HiOutlineRefresh} from 'react-icons/hi';

import Loader from '../../../components/ui/Loader';
import {useCodeStatuses} from '../hooks/useRootRouterData';


type Props = {
    details?: (props: ContentProps) => JSX.Element;
};

type ContentProps = {
    code: number;
};


export default function PoolCodes({details: Details}: Props) {
    const [selectedCode, setSelectedCode] = useState<number | null>(null);
    const [enteredCode, setEnteredCode] = useState<number | null>(null);
    const [filterBlocked, setFilterBlocked] = useState(true);
    const [filterHeld, setFilterHeld] = useState(true);
    const [filterAvailable, setFilterAvailable] = useState(true);
    const [filterMinted, setFilterMinted] = useState(true);

    const codeStatuses = useCodeStatuses();
    if (codeStatuses.data == null) {
        return <Loader/>;
    }

    const handleRefresh = () => {
        setSelectedCode(null);
        codeStatuses.refresh();
    };

    const handleCodeSelection = (code: number) => {
        setSelectedCode(code);
    };

    const handleResetFilters = () => {
        setFilterBlocked(true);
        setFilterHeld(true);
        setFilterAvailable(true);
        setFilterMinted(true);
    };

    const handleInputCode = (event: ChangeEvent<HTMLInputElement>) => {
        if (codeStatuses.data === null) {
            return;
        }

        const codeInput = event.target.value.replace(/\D/g, '');
        const code = Number(codeInput);

        if ((codeInput.length !== 3) || (code < 0) || (code >= POOL_SIZE) || (codeStatuses.data[code] !== CodeStatus.AvailableForMinting)) {
            setEnteredCode(null);
        } else {
            setEnteredCode(code);
        }
    };

    const filterCodes = () => {
        if (codeStatuses.data === null) {
            return [];
        }

        const filteredCodes: number[] = [];
        for (let code = 100; code < POOL_SIZE; ++code) {
            if (
                ((codeStatuses.data[code] === CodeStatus.Blocked) && filterBlocked) ||
                ((codeStatuses.data[code] === CodeStatus.Held) && filterHeld) ||
                ((codeStatuses.data[code] === CodeStatus.AvailableForMinting) && filterAvailable) ||
                ((codeStatuses.data[code] === CodeStatus.Active) && filterMinted)
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
        <div>
            <button
                onClick={handleRefresh}
                className="border rounded-md p-1 m-1
                        bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                        dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
            >
                <HiOutlineRefresh/>
            </button>
            <div className="flex flex-col">
                <div>
                    <span>Input number:</span>
                    <input
                        className="ml-2 p-1 pl-2"
                        type="text"
                        placeholder="Number"
                        onChange={handleInputCode}
                    />
                    {Details && (enteredCode !== null) && <Details code={enteredCode}/>}
                </div>
                <span className="text-xs">*The code consists of three digits and cannot start with a zero</span>
            </div>
            <div>
                <div className="flex flex-row items-start my-3 gap-3">
                    Filters:
                    <div className="flex flex-row gap-3 items-center flex-wrap">
                        <button
                            onClick={handleResetFilters}
                            className={'border rounded-md px-1 h-[30px] w-[75px] text-xs text-quicBlueL-400 dark:text-quicBlueD-400' +
                                (filterBlocked && filterHeld && filterAvailable && filterMinted
                                    ? 'bg-quicBlueL-200 dark:bg-quicBlueD-200'
                                    : 'bg-quicBlueL hover:bg-quicBlueL-200 dark:bg-quicBlueD dark:hover:bg-quicBlueD-200')}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilterBlocked(!filterBlocked)}
                            className={'border rounded-md px-1 h-[30px] w-[75px] text-xs text-quicBlueL-400 dark:text-quicBlueD-400' +
                                (!filterBlocked
                                    ? 'bg-quicBlueL-200 dark:bg-quicBlueD-200'
                                    : 'bg-quicBlueL hover:bg-quicBlueL-200 dark:bg-quicBlueD dark:hover:bg-quicBlueD-200')}
                        >
                            Blocked
                        </button>
                        <button
                            onClick={() => setFilterHeld(!filterHeld)}
                            className={'border rounded-md px-1 h-[30px] w-[75px] text-xs text-quicBlueL-400 dark:text-quicBlueD-400' +
                                (!filterHeld
                                    ? 'bg-quicBlueL-200 dark:bg-quicBlueD-200'
                                    : 'bg-quicBlueL hover:bg-quicBlueL-200 dark:bg-quicBlueD dark:hover:bg-quicBlueD-200')}
                        >
                            Held
                        </button>
                        <button
                            onClick={() => setFilterAvailable(!filterAvailable)}
                            className={'border rounded-md px-1 h-[30px] w-[75px] text-xs text-quicBlueL-400 dark:text-quicBlueD-400' +
                                (!filterAvailable
                                    ? 'bg-quicBlueL-200 dark:bg-quicBlueD-200'
                                    : 'bg-quicBlueL hover:bg-quicBlueL-200 dark:bg-quicBlueD dark:hover:bg-quicBlueD-200')}
                        >
                            Available
                        </button>
                        <button
                            onClick={() => setFilterMinted(!filterMinted)}
                            className={'border rounded-md px-1 h-[30px] w-[75px] text-xs text-quicBlueL-400 dark:text-quicBlueD-400' +
                                (!filterMinted
                                    ? 'bg-quicBlueL-200 dark:bg-quicBlueD-200'
                                    : 'bg-quicBlueL hover:bg-quicBlueL-200 dark:bg-quicBlueD dark:hover:bg-quicBlueD-200')}
                        >
                            Minted
                        </button>
                    </div>
                </div>
                <div
                    className="flex flex-col gap-3 mt-5">
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
                                        <details key={indexB} className="ml-8 my-3">
                                            <summary>{indexA}{indexB}*</summary>
                                            {codesB.map((code) => {
                                                let bgColor = '';
                                                if (codeStatuses.data?.[code] === CodeStatus.AvailableForMinting) {
                                                    bgColor = 'bg-green-300';
                                                } else if (codeStatuses.data?.[code] === CodeStatus.Active) {
                                                    bgColor = 'bg-white-300';
                                                } else if (codeStatuses.data?.[code] === CodeStatus.Held) {
                                                    bgColor = 'bg-blue-300';
                                                } else if (codeStatuses.data?.[code] === CodeStatus.Blocked) {
                                                    bgColor = 'bg-red-300';
                                                }


                                                return <button
                                                    key={code}
                                                    disabled={!Details}
                                                    onClick={() => handleCodeSelection(code)}
                                                    className={`w-[200px] border rounded-lg h-10 my-2 ml-8 text-quicBlackL-200 dark:quicBlackD-200 ${bgColor}`}
                                                >{code.toString().padStart(3, '0')}</button>;
                                            })}
                                            {Details && (selectedCode !== null) && <Details code={selectedCode}/>}
                                        </details>
                                    );
                                })}
                            </details>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
