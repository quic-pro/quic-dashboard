import {CodeStatus} from '@mvts/contract-interfaces-js';
import {ROOT_ROUTER_POOL_SIZE as POOL_SIZE} from '@mvts/contract-interfaces-js/dist/constants';
import {InputNumber} from 'components/ui/inputs';
import Loader from 'components/ui/Loader';
import {ChangeEvent, useState} from 'react';
import {HiOutlineRefresh} from 'react-icons/hi';

import {useCodeStatuses} from '../hooks/useRootRouterData';


type Props = {
    details?: (props: ContentProps) => JSX.Element;
};

type ContentProps = {
    code: number;
};


const FILTERS = [CodeStatus.AvailableForMinting, CodeStatus.Active, CodeStatus.Held, CodeStatus.Blocked];


export default function PoolCodes({details: Details}: Props) {
    const [selectedCode, setSelectedCode] = useState<number | null>(null);
    const [enteredCode, setEnteredCode] = useState<number | null>(null);
    const [filters, setFilters] = useState<boolean[]>(Array(FILTERS.length).fill(true));

    const codeStatuses = useCodeStatuses();
    if (codeStatuses.data == null) {
        return <Loader/>;
    }

    const handleRefresh = () => {
        setSelectedCode(null);
        codeStatuses.refresh();
    };

    const handleCodeSelection = (code: number) => {
        setSelectedCode(selectedCode !== code ? code : null);
    };

    const handleInputCode = (event: ChangeEvent<HTMLInputElement>) => {
        if (codeStatuses.data === null) {
            return;
        }

        const codeInput = event.target.value.replace(/\D/g, '');
        const code = Number(codeInput);

        if ((codeInput.length !== 3) || (code < 0) || (code >= POOL_SIZE)) {
            setEnteredCode(null);
        } else {
            setEnteredCode(code);
        }
    };

    const handleChangeFilter = (filter: CodeStatus) => {
        filters[filter] = !filters[filter];
        setFilters([...filters]);
    };

    const splitCodes = () => {
        if (codeStatuses.data === null) {
            return [];
        }

        const tree: number[][][] = [];

        codeStatuses.data.forEach((codeStatus, code) => {
            if ((code < 100) || !filters[codeStatus]) {
                return;
            }

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
                className="flex border rounded-md px-2 py-1 h-8 items-center
                    bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                    dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
            >
                <HiOutlineRefresh className="mr-1"/>
                Refresh
            </button>
            <div className="flex flex-col">
                <div>
                    <span>Input code:</span>
                    <InputNumber
                        className="ml-2 p-1 pl-2"
                        placeholder="Number"
                        onChange={handleInputCode}
                    />
                </div>
                <span className="text-xs">*The code consists of three digits and cannot start with a zero</span>
                {Details && (enteredCode !== null) && <Details code={enteredCode}/>}
            </div>
            <div>
                <div className="flex flex-col items-start my-3">
                    Filters:
                    {FILTERS.map((filter) => (
                        <div key={filter}>
                            <input
                                type="checkbox"
                                checked={filters[filter]}
                                onChange={() => handleChangeFilter(filter)}
                                className="text-quicBlueL-400 dark:text-quicBlueD-400"
                            />
                            <span>{CodeStatus[filter]}</span>
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-3 mt-5">
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


                                                return (
                                                    <div key={code} className="mt-2 ml-8">
                                                        <button
                                                            disabled={!Details}
                                                            onClick={() => handleCodeSelection(code)}
                                                            className={`w-48 border rounded-lg h-10 text-quicBlackL-200 dark:quicBlackD-200 ${bgColor}`}
                                                        >{code.toString().padStart(3, '0')}</button>
                                                        {Details && (selectedCode === code) && codesB.includes(selectedCode) && <Details code={selectedCode}/>}
                                                    </div>
                                                );
                                            })}
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
