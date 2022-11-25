import React, { useEffect, useState } from 'react';
import { rootRouter } from '../contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3React } from '@web3-react/core';
import Loader from '../components/Loader';


export default function NumberManagementPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedCodeInfo, setIsLoadedodeInfo] = useState(false);
    const [selectedCode, setSelectedCode] = useState(-1);
    const [subscriptionPrice, setSubscriptionPrice] = useState(BigNumber.from(0));
    const [myNumbers, setMyNumbers] = useState([] as boolean[]);
    const [codeInfo, setCodeInfo] = useState<any>(null);

    const { account, ENSName } = useWeb3React();

    useEffect(() => {
        rootRouter?.getAddressNumbers(account ?? ENSName as string)
            .then((numbers) => {
                setMyNumbers(numbers);
                const firstNum = numbers.findIndex((num) => num);
                setSelectedCode(firstNum);
                if (firstNum != -1) {
                    rootRouter?.subscriptionPrice()
                        .then(setSubscriptionPrice)
                        .catch(console.error)
                    rootRouter?.pool(BigNumber.from(firstNum))
                        .then(setCodeInfo)
                        .then(() => setIsLoadedodeInfo(true))
                        .catch(console.error)
                }
            })
            .then(() => setIsLoaded(true))
            .catch(console.error)
    }, [])

    const selectNumber = (num: string | number) => {
        setIsLoadedodeInfo(false);
        setSelectedCode(+num);
        rootRouter?.pool(BigNumber.from(num))
            .then(setCodeInfo)
            .then(() => setIsLoadedodeInfo(true))
            .catch(console.error)
    };

    const onRenewSubscription = () => {
        rootRouter?.renewSubscription(BigNumber.from(selectedCode), {
            value: subscriptionPrice,
            gasLimit: 1000000
        })
            .then(() => selectNumber(selectedCode))
            .catch(() => selectNumber(selectedCode))
    }

    function InputAddress({ placeholder, state, setState }: { placeholder: string, state: string, setState: any }) {
        return (
            <input
                className='mr-[8px] my-[2px] p-1 bg-companyL dark:bg-companyD w-[200px]'
                type="text"
                placeholder={placeholder}
                value={state}
                onChange={(event) => {
                    const result = event.target.value.replace(/[^0-9a-zA-Z]+/g, '');
                    setState(result);
                }}
            />
        )
    }

    function InputString({ placeholder, state, setState }: { placeholder: string, state: string, setState: any }) {
        return (
            <input
                className='mr-[8px] my-[2px] p-1 bg-companyL dark:bg-companyD w-[200px]'
                type="text"
                placeholder={placeholder}
                value={state}
                onChange={(event) => {
                    setState(event.target.value);
                }}
            />
        )
    }

    function InputNumber({ placeholder, state, setState }: { placeholder: string, state: string, setState: any }) {
        return (
            <input
                className='mr-[8px] my-[2px] p-1 bg-companyL dark:bg-companyD w-[200px]'
                type="text"
                placeholder={placeholder}
                value={state}
                onChange={(event) => {
                    const result = event.target.value.replace(/\D/, '');
                    setState(result);
                }}
            />
        )
    }

    function NumberSettings() {
        const [newOwner, setNewOwner] = useState('');
        const [newSipDomain, setNewSipDomain] = useState('');

        return (
            <div>
                <div>
                    <p>Info: </p>
                    <p>Mode: {codeInfo.mode == 0 ? 'Number' : 'Pool'}</p>
                    <p>SipDomain: {codeInfo.hasSipDomain ? codeInfo.sipDomain : '<DEFAULT>'}</p>
                </div>
                <div className='pt-[10px]'>
                    <div className='text-xl font-medium text-companyL-400 dark:text-companyD-400 py-[10px]'>
                        Methods:
                    </div>
                    <div>
                        <button className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                            onClick={() => {
                                rootRouter?.changeCustomerNumberMode(BigNumber.from(selectedCode))
                                    .catch(console.error);
                            }}>changeMode</button>
                        <div>
                            <button className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                                onClick={() => {
                                    rootRouter?.transferOwnershipOfCustomerNumber(BigNumber.from(selectedCode), newOwner)
                                        .catch(console.error);
                                }}>transferOwnership</button>
                            <InputAddress placeholder='newOwner' state={newOwner} setState={setNewOwner} />
                        </div>
                        <button className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                            onClick={() => {
                                rootRouter?.renounceOwnershipOfCustomerNumber(BigNumber.from(selectedCode))
                                    .catch(console.error);
                            }}>renounceOwnership</button>
                        <div>
                            <button className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                                onClick={() => {
                                    rootRouter?.setCustomerNumberSipDomain(BigNumber.from(selectedCode), newSipDomain)
                                        .catch(console.error);
                                }}>setSipDomain</button>
                            <InputString placeholder='newSipDomain' state={newSipDomain} setState={setNewSipDomain} />
                        </div>
                        <button className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                            onClick={() => {
                                rootRouter?.clearCustomerNumberSipDomain(BigNumber.from(selectedCode))
                                    .catch(console.error);
                            }}>clearSipDomain</button>
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
                    <p>Info: </p>
                    <p>mode: {codeInfo.mode == 0 ? 'Number' : 'Pool'}</p>
                    <p>router: {codeInfo.hasRouter ? null : '<MISSING>'}</p>
                    {codeInfo.hasRouter ? <p>&nbsp;&nbsp;&nbsp;&nbsp;chainId: {codeInfo.router.chainId}</p> : null}
                    {codeInfo.hasRouter ? <p>&nbsp;&nbsp;&nbsp;&nbsp;address: {codeInfo.router.adr}</p> : null}
                    {codeInfo.hasRouter ? <p>&nbsp;&nbsp;&nbsp;&nbsp;poolCodeLength: {codeInfo.router.poolCodeLength}</p> : null}
                </div>
                <div className='pt-[10px]'>
                    <div className='text-xl font-medium text-companyL-400 dark:text-companyD-400 py-[10px]'>
                        Methods:
                    </div>
                    <div>
                        <button className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                            onClick={() => {
                                rootRouter?.changeCustomerNumberMode(BigNumber.from(selectedCode))
                                    .catch(console.error);
                            }}>changeMode</button>
                        <div>
                            <button className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                                onClick={() => {
                                    rootRouter?.transferOwnershipOfCustomerNumber(BigNumber.from(selectedCode), newOwner)
                                        .catch(console.error);
                                }}>transferOwnership</button>
                            <InputAddress placeholder='newOwner' state={newOwner} setState={setNewOwner} />
                        </div>
                        <button className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                            onClick={() => {
                                rootRouter?.renounceOwnershipOfCustomerNumber(BigNumber.from(selectedCode))
                                    .catch(console.error);
                            }}>renounceOwnership</button>
                        <div>
                            <button className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                                onClick={() => {
                                    rootRouter?.setCustomerNumberRouter(BigNumber.from(selectedCode), BigNumber.from(newChainId), newAddress, BigNumber.from(newPoolCodeLength))
                                        .catch(console.error);
                                }}>setRouter</button>
                            <InputNumber placeholder='newChainId' state={newChainId} setState={setNewChainId} />
                            <InputAddress placeholder='newAddress' state={newAddress} setState={setNewAddress} />
                            <InputNumber placeholder='newPoolCodeLength' state={newPoolCodeLength} setState={setNewPoolCodeLength} />
                        </div>

                        <button className="border-1 rounded-lg p-1 m-2 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]"
                            onClick={() => {
                                rootRouter?.clearCustomerNumberRouter(BigNumber.from(selectedCode))
                                    .catch(console.error);
                            }}>clearRouter</button>
                    </div>
                </div>
            </div>
        );
    }


    if (!isLoaded) {
        return <Loader />
    } else {
        return (
            <div className='mx-0 md:mx-[30px] flex flex-row justify-center'>
                <div className='w-[600px] rounded-sm shadow-lg shadow-gray-400/30 border-[1px]'>
                    <div className='m-[10px] p-[10px] bg-white rounded-sm'>
                        <div className='text-2xl font-medium text-companyL-400 dark:text-companyD-400'>
                            My numbers
                        </div>
                        <div className='my-[10px] grid grid-cols-4 md:grid-cols-6 gap-[5px]'>
                            {myNumbers.length === 0 ? 'You don\'t have numbers' : null}
                            {myNumbers.map((code, index) => {
                                if (code) {
                                    return <button className={"border-1 rounded-lg w-[70px] h-[40px] text-companyL-400 dark:text-companyD-400  hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]" +
                                        (selectedCode === index ? 'bg-companyL-200 dark:bg-companyD-200' : 'bg-companyL dark:bg-companyD')}
                                        key={index} onClick={() => { selectNumber(index); setSelectedCode(index) }}>{index}</button>
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                        <div className='text-xl font-medium text-companyL-400 dark:text-companyD-400 py-[10px]'>
                            {'Status of Number ' + selectedCode + ':'}
                        </div>
                        {
                            selectedCode === -1
                                ? null
                                : !isLoadedCodeInfo ? <Loader /> : (codeInfo.mode == 0 ? <NumberSettings /> : <PoolSettings />)
                        }
                    </div>
                </div>
            </div>
        );
    }
}
