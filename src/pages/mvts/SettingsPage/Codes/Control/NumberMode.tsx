import {RootRouter} from '@mvts/contract-interfaces-js';
import {ChangeEvent, useState} from 'react';
import {useAccount} from 'wagmi';

import {
    useChangeCodeMode,
    useClearCodeSipDomain,
    useRenounceOwnershipOfCode,
    useSafeTransferFrom,
    useSetCodeSipDomain,
} from '../../../../../hooks/mvts/rootRouter';


type Props = {
    code: number;
    data: RootRouter.CodeDataStructOutput;
};


export default function NumberMode({code, data}: Props) {
    const [newSipDomain, setNewSipDomain] = useState('');
    const [to, setTo] = useState('');

    const {address} = useAccount();

    const setCodeSipDomain = useSetCodeSipDomain();
    const clearCodeSipDomain = useClearCodeSipDomain();
    const changeCodeMode = useChangeCodeMode();
    const renounceOwnershipOfCode = useRenounceOwnershipOfCode();
    const safeTransferFrom = useSafeTransferFrom();

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>, setState: (newValue: string) => void) => {
        setState(event.target.value);
    };

    return (
        <div>
            <div>
                <span className="mr-2">Mode:</span>
                <span>Number</span>
            </div>
            <div>
                <span className="mr-2">SIP domain:</span>
                <span>{data.sipDomain}</span>
            </div>
            <div className="w-[300px] md:w-full">
                <span className="mr-2 whitespace-nowrap">SIP URI:</span>
                <span className="break-words">
                    {address}@{data.sipDomain}
                </span>
            </div>
            <div className="mt-4">
                <div>
                    <button onClick={() => changeCodeMode(code)}
                        className="border rounded-md mb-2 px-1 mt-10 h-[34px]
                        bg-quicBlueL-400 hover:bg-white text-white border-quicBlueL-400 hover:text-quicBlueL-400
                        dark:bg-quicBlueD-400 dark:hover:bg-white dark:text-white
                        dark:hover:text-quicBlueD-400 dark:border-quicBlueD-400"
                    >
                        Change Mode
                    </button>
                </div>
                <details className="flex flex-col my-3">
                    <summary>Set SIP Domain</summary>
                    <div className="flex flex-row">
                        <input type="text"
                            placeholder="newSipDomain"
                            value={newSipDomain}
                            onChange={(event) => handleChangeInput(event, setNewSipDomain)}
                            className="ml-5 my-3 h-[34px] px-2 rounded-md"
                        />
                        <button onClick={() => setCodeSipDomain(code, newSipDomain)}
                            className="ml-5 border rounded-md my-3 px-1 h-[34px]
                            bg-quicBlueL-400 hover:bg-white text-white border-quicBlueL-400 hover:text-quicBlueL-400
                            dark:bg-quicBlueD-400 dark:hover:bg-white dark:text-white
                            dark:hover:text-quicBlueD-400 dark:border-quicBlueD-400"
                        >
                            Apply
                        </button>
                    </div>
                </details>
                <div>
                    <button onClick={() => clearCodeSipDomain(code)}
                        className="border rounded-md my-2 px-1 h-[34px]
                        bg-quicBlueL-400 hover:bg-white text-white border-quicBlueL-400 hover:text-quicBlueL-400
                        dark:bg-quicBlueD-400 dark:hover:bg-white dark:text-white
                        dark:hover:text-quicBlueD-400 dark:border-quicBlueD-400"
                    >
                        Clear SIP Domain
                    </button>
                </div>
                <details className="flex flex-col my-3">
                    <summary>Transfer</summary>
                    <div className="flex flex-row">
                        <input type="text"
                            placeholder="to"
                            value={to}
                            onChange={(event) => handleChangeInput(event, setTo)}
                            className="ml-5 my-3 h-[34px] px-2 rounded-md"
                        />
                        <button onClick={() => safeTransferFrom(address!, to, code)}
                            className="ml-5 border rounded-md my-3 px-1 h-[34px]
                            bg-quicBlueL-400 hover:bg-white text-white border-quicBlueL-400 hover:text-quicBlueL-400
                            dark:bg-quicBlueD-400 dark:hover:bg-white dark:text-white
                            dark:hover:text-quicBlueD-400 dark:border-quicBlueD-400"
                        >
                            Apply
                        </button>
                    </div>
                </details>
                <div>
                    <button onClick={() => renounceOwnershipOfCode(code)}
                        className="border rounded-md mt-2 mb-5 px-1 h-[34px]
                        bg-quicBlueL-400 hover:bg-white text-white border-quicBlueL-400 hover:text-quicBlueL-400
                        dark:bg-quicBlueD-400 dark:hover:bg-white dark:text-white
                        dark:hover:text-quicBlueD-400 dark:border-quicBlueD-400"
                    >
                        Renounce Ownership
                    </button>
                </div>
            </div>
        </div>
    );
}
