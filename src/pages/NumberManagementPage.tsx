import {BigNumber} from '@ethersproject/bignumber';
import {RootRouter} from '@mvts/contract-interfaces-js';
import {getActualRootRouter} from '@mvts/resolver-js';
import {useWeb3React} from '@web3-react/core';
import React, {useEffect, useState} from 'react';
import {BiCopy} from 'react-icons/bi';
import {FiRefreshCcw} from 'react-icons/fi';

import Loader from '../components/Loader';


export default function NumberManagementPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedCodeInfo, setIsLoadedCodeInfo] = useState(false);
    const [selectedCode, setSelectedCode] = useState(-1);
    const [modeChangePrice, setModeChangePrice] = useState(BigNumber.from(0));
    const [defaultSipDomain, setDefaultSipDomain] = useState('');
    const [myNumbers, setMyNumbers] = useState([] as boolean[]);
    const [codeInfo, setCodeInfo] = useState<RootRouter.CodeStructOutput | null>(null);
    const [rootRouter, setRootRouter] = useState<RootRouter | null>(null);

    const {account, ENSName, provider} = useWeb3React();

    useEffect(() => {
        if (!provider) {
            return;
        }

        void getActualRootRouter(() => provider.getSigner())
            .then(setRootRouter)
            .catch();
    }, [provider]);

    useEffect(() => {
        if (!rootRouter || (!account && !ENSName)) {
            return;
        }

        rootRouter.modeChangePrice()
            .then(setModeChangePrice)
            .catch(console.error);

        rootRouter.getOwnerCodes(account ?? ENSName as string)
            .then((numbers) => {
                setMyNumbers(numbers);
                const firstNum = numbers.findIndex((num) => num);
                setSelectedCode(firstNum);
                if (firstNum !== -1) {
                    rootRouter.defaultSipDomain()
                        .then(setDefaultSipDomain)
                        .catch(console.error);
                    rootRouter.getCodeData(BigNumber.from(firstNum))
                        .then(setCodeInfo)
                        .then(() => setIsLoadedCodeInfo(true))
                        .catch(console.error);
                }
            })
            .then(() => setIsLoaded(true))
            .catch(console.error);
    }, [rootRouter]);

    const selectNumber = (num: string | number) => {
        if (!rootRouter) {
            return;
        }

        setIsLoadedCodeInfo(false);
        setSelectedCode(+num);
        rootRouter.getCodeData(BigNumber.from(num))
            .then(setCodeInfo)
            .then(() => setIsLoadedCodeInfo(true))
            .catch(console.error);
    };

    function InputAddress({placeholder, state, setState}: { placeholder: string, state: string, setState: (newValue: string) => void}) {
        return (
            <input
                className="mr-[8px] my-[2px] p-1 bg-companyL dark:bg-companyD w-[200px]"
                type="text"
                placeholder={placeholder}
                value={state}
                onChange={(event) => {
                    const result = event.target.value.replace(/[^0-9a-zA-Z]+/g, '');
                    setState(result);
                }}
            />
        );
    }

    function InputString({placeholder, state, setState}: {placeholder: string, state: string, setState: (newValue: string) => void}) {
        return (
            <input
                className="mr-[8px] my-[2px] p-1 bg-companyL dark:bg-companyD w-[200px]"
                type="text"
                placeholder={placeholder}
                value={state}
                onChange={(event) => {
                    setState(event.target.value);
                }}
            />
        );
    }

    function InputNumber({placeholder, state, setState}: {placeholder: string, state: string, setState: (newValue: string) => void}) {
        return (
            <input
                className="mr-[8px] my-[2px] p-1 bg-companyL dark:bg-companyD w-[200px]"
                type="text"
                placeholder={placeholder}
                value={state}
                onChange={(event) => {
                    const result = event.target.value.replace(/\D/, '');
                    setState(result);
                }}
            />
        );
    }

    function NumberSettings() {
        const [newOwner, setNewOwner] = useState('');
        const [newSipDomain, setNewSipDomain] = useState('');

        const sipDomain = codeInfo?.hasSipDomain ? codeInfo.sipDomain : defaultSipDomain;
        const sipUri = `${account ?? ENSName ?? ''}@${sipDomain}`;

        return (
            <div>
                <div>
                    <p>code: {selectedCode}</p>
                    <p>mode: {codeInfo?.mode === 0 ? 'Number' : 'Pool'}</p>
                    <p>sipDomain: {sipDomain}</p>
                    <div className='flex flex-row gap-[10px] items-center'>
                        <p>sipUri: </p>
                        <p className=' w-[100px] truncate'>{sipUri}</p>
                        <button
                            onClick={() => void navigator.clipboard.writeText(sipUri)}
                            className='flex items-center justify-center w-[30px] h-[30px] border-1 rounded-lg p-1 ml-0 text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]'
                        >
                            <BiCopy />
                        </button>
                    </div>
                </div>
                <div className="pt-[10px]">
                    <div className="text-xl font-medium text-companyL-400 dark:text-companyD-400 py-[10px]">
                        Methods:
                    </div>
                    <div>
                        <button
                            className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                            onClick={() => {
                                rootRouter?.changeCodeMode(BigNumber.from(selectedCode), {value: modeChangePrice, gasLimit: 1000000})
                                    .catch(console.error);
                            }}>changeMode
                        </button>
                        <div>
                            <button
                                className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                                onClick={() => {
                                    rootRouter?.['safeTransferFrom(address,address,uint256)'](account ?? ENSName as string, newOwner, BigNumber.from(selectedCode))
                                        .catch(console.error);
                                }}>transferOwnership
                            </button>
                            <InputAddress placeholder="newOwner" state={newOwner} setState={setNewOwner} />
                        </div>
                        <button
                            className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                            onClick={() => {
                                rootRouter?.renounceOwnershipOfCode(BigNumber.from(selectedCode))
                                    .catch(console.error);
                            }}>renounceOwnership
                        </button>
                        <div>
                            <button
                                className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                                onClick={() => {
                                    rootRouter?.setCodeSipDomain(BigNumber.from(selectedCode), newSipDomain)
                                        .catch(console.error);
                                }}>setSipDomain
                            </button>
                            <InputString placeholder="newSipDomain" state={newSipDomain} setState={setNewSipDomain} />
                        </div>
                        <button
                            className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                            onClick={() => {
                                rootRouter?.clearCodeSipDomain(BigNumber.from(selectedCode))
                                    .catch(console.error);
                            }}>clearSipDomain
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    function PoolSettings() {
        const [newOwner, setNewOwner] = useState('');
        const [newChainId, setNewChainId] = useState('');
        const [newAddress, setNewAddress] = useState('');
        const [newPoolCodeLength, setNewPoolCodeLength] = useState('');

        return (
            <div>
                <div>
                    <p>code: {selectedCode}</p>
                    <p>mode: {codeInfo?.mode === 0 ? 'Number' : 'Pool'}</p>
                    <p>router: {codeInfo?.hasRouter ? null : '<MISSING>'}</p>
                    {codeInfo?.hasRouter ? <p>&nbsp;&nbsp;&nbsp;&nbsp;chainId: {codeInfo?.router.chainId.toString()}</p> : null}
                    {codeInfo?.hasRouter ? <p>&nbsp;&nbsp;&nbsp;&nbsp;address: {codeInfo?.router.adr}</p> : null}
                    {codeInfo?.hasRouter ? <p>&nbsp;&nbsp;&nbsp;&nbsp;poolCodeLength: {codeInfo?.router.poolCodeLength.toString()}</p> : null}
                </div>
                <div className="pt-[10px]">
                    <div className="text-xl font-medium text-companyL-400 dark:text-companyD-400 py-[10px]">
                        Methods:
                    </div>
                    <div>
                        <button
                            className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                            onClick={() => {
                                rootRouter?.changeCodeMode(BigNumber.from(selectedCode), {value: modeChangePrice, gasLimit: 1000000})
                                    .catch(console.error);
                            }}>changeMode
                        </button>
                        <div>
                            <button
                                className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                                onClick={() => {
                                    rootRouter?.['safeTransferFrom(address,address,uint256)'](account ?? ENSName as string, newOwner, BigNumber.from(selectedCode))
                                        .catch(console.error);
                                }}>transferOwnership
                            </button>
                            <InputAddress placeholder="newOwner" state={newOwner} setState={setNewOwner} />
                        </div>
                        <button
                            className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                            onClick={() => {
                                rootRouter?.renounceOwnershipOfCode(BigNumber.from(selectedCode))
                                    .catch(console.error);
                            }}>renounceOwnership
                        </button>
                        <div>
                            <button
                                className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                                onClick={() => {
                                    rootRouter?.setCodeRouter(BigNumber.from(selectedCode), BigNumber.from(newChainId), newAddress, BigNumber.from(newPoolCodeLength))
                                        .catch(console.error);
                                }}>setRouter
                            </button>
                            <InputNumber placeholder="newChainId" state={newChainId} setState={setNewChainId} />
                            <InputAddress placeholder="newAddress" state={newAddress} setState={setNewAddress} />
                            <InputNumber placeholder="newPoolCodeLength" state={newPoolCodeLength}
                                setState={setNewPoolCodeLength} />
                        </div>

                        <button
                            className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                            onClick={() => {
                                rootRouter?.clearCodeRouter(BigNumber.from(selectedCode))
                                    .catch(console.error);
                            }}>clearRouter
                        </button>
                    </div>
                </div>
            </div>
        );
    }


    if (!isLoaded) {
        return <Loader />;
    } else {
        return (
            <div className="mx-0 md:mx-[30px] flex flex-row justify-center">
                <div className="w-[600px] rounded-sm shadow-lg shadow-gray-400/30 border-[1px]">
                    <div className="m-[10px] p-[10px] bg-white rounded-sm">
                        <div className="text-2xl font-medium text-companyL-400 dark:text-companyD-400">
                            My numbers
                        </div>
                        <div className="my-[10px] grid grid-cols-4 md:grid-cols-6 gap-[5px]">
                            {myNumbers.length === 0 ? 'You don\'t have numbers' : null}
                            {myNumbers.map((code, index) => {
                                if (code) {
                                    return <button
                                        className={'border-1 rounded-lg w-[70px] h-[40px] text-companyL-400 dark:text-companyD-400  hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]' +
                                            (selectedCode === index ? 'bg-companyL-200 dark:bg-companyD-200' : 'bg-companyL dark:bg-companyD')}
                                        key={index} onClick={() => {
                                            selectNumber(index);
                                            setSelectedCode(index);
                                        }}>{index}</button>;
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                        <div className='flex flex-row gap-[30px] items-center mt-[30px]'>
                            <div className='text-xl font-medium text-companyL-400 dark:text-companyD-400 py-[10px]'>
                                Information
                            </div>
                            <button onClick={() => selectNumber(selectedCode)} className='flex items-center justify-center border-1 rounded-lg w-[35px] h-[35px] p-1 ml-0 text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]'>
                                <FiRefreshCcw />
                            </button>
                        </div>
                        {
                            selectedCode !== -1
                                ? null
                                : !isLoadedCodeInfo ? <Loader /> : (codeInfo?.mode === 0 ? <NumberSettings /> : <PoolSettings />)
                        }
                    </div>
                </div>
            </div>
        );
    }
}
