import {RootRouter} from '@mvts/contract-interfaces-js';
import {ChangeEvent, useState} from 'react';
import {useAccount} from 'wagmi';

import {
    useChangeCodeMode,
    useClearCodeRouter,
    useRenounceOwnershipOfCode,
    useSafeTransferFrom,
    useSetCodeRouter,
} from '../../../../../hooks/mvts/rootRouter';


type Props = {
    code: number;
    data: RootRouter.CodeStructOutput;
};


export default function PoolMode({code, data}: Props) {
    const [newChainId, setNewChainId] = useState('');
    const [newAdr, setNewAdr] = useState('');
    const [newPoolCodeLength, setNewPoolCodeLength] = useState('');
    const [to, setTo] = useState('');

    const {address} = useAccount();

    const changeCodeMode = useChangeCodeMode();
    const setCodeRouter = useSetCodeRouter();

    const handleChangeInput = (event: ChangeEvent<HTMLInputElement>, setState: (newValue: string) => void) => {
        setState(event.target.value);
    };

    const clearCodeRouter = useClearCodeRouter();
    const renounceOwnershipOfCode = useRenounceOwnershipOfCode();
    const safeTransferFrom = useSafeTransferFrom();

    return (
        <div>
            <div>
                <span className="mr-2">Mode:</span>
                <span>Pool</span>
            </div>
            <div>
                <span className="mr-2">Router:</span>
                <span>{data.hasRouter ? '' : 'No router'}</span>
            </div>
            {data.hasRouter && (
                <div className="ml-5">
                    <div>
                        <span className="mr-2">Chain ID:</span>
                        <span>{data.router.chainId.toString()}</span>
                    </div>
                    <div className="w-[300px] md:w-full">
                        <span className="mr-2">Address:</span>
                        <span className="break-words">{data.router.adr}</span>
                    </div>
                    <div>
                        <span className="mr-2">Pool code length:</span>
                        <span>{data.router.poolCodeLength.toString()}</span>
                    </div>
                </div>
            )}
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
                    <summary>Set Route</summary>
                    <input type="text"
                        placeholder="newChainId"
                        value={newChainId}
                        onChange={(event) => handleChangeInput(event, setNewChainId)}
                        className="ml-5 my-3 h-[34px] px-2 rounded-md"
                    />
                    <input type="text"
                        placeholder="newAdr"
                        value={newAdr}
                        onChange={(event) => handleChangeInput(event, setNewAdr)}
                        className="ml-5 my-3 h-[34px] px-2 rounded-md"
                    />
                    <input type="text"
                        placeholder="newPoolCodeLength"
                        value={newPoolCodeLength}
                        onChange={(event) => handleChangeInput(event, setNewPoolCodeLength)}
                        className="ml-5 my-3 h-[34px] px-2 rounded-md"
                    />
                    <div className="flex flex-row-reverse w-[200px]">
                        <button onClick={() => setCodeRouter(code, newChainId, newAdr, newPoolCodeLength)}
                            className="border rounded-md my-3 px-1 h-[34px]
                            bg-quicBlueL-400 hover:bg-white text-white border-quicBlueL-400 hover:text-quicBlueL-400
                            dark:bg-quicBlueD-400 dark:hover:bg-white dark:text-white
                            dark:hover:text-quicBlueD-400 dark:border-quicBlueD-400"
                        >
                            Apply
                        </button>
                    </div>
                </details>
                <div>
                    <button onClick={() => clearCodeRouter(code)}
                        className="border rounded-md my-2 px-1 h-[34px]
                        bg-quicBlueL-400 hover:bg-white text-white border-quicBlueL-400 hover:text-quicBlueL-400
                        dark:bg-quicBlueD-400 dark:hover:bg-white dark:text-white
                        dark:hover:text-quicBlueD-400 dark:border-quicBlueD-400"
                    >
                        Clear Router
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
                        className="border rounded-md my-2 px-1 h-[34px] mb-5
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
