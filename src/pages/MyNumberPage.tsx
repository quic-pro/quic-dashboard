import React, { useEffect, useState } from 'react';
import { rootRouter } from '../contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3React } from '@web3-react/core';
import Loader from '../components/Loader';
import { formatEther } from '@ethersproject/units';
import { CHAIN_INFO } from '../constants/chain';


export default function MyNumberPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedCodeInfo, setIsLoadedodeInfo] = useState(false);
    const [selectedCode, setSelectedCode] = useState(-1);
    const [subscriptionPrice, setSubscriptionPrice] = useState(BigNumber.from(0));
    const [myNumbers, setMyNumbers] = useState([] as boolean[]);
    const [codeStatus, setCodeStatus] = useState<any>(null);
    const [codeMode, setCodeMode] = useState(0);

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
                    rootRouter?.getMode(BigNumber.from(firstNum))
                        .then(setCodeMode)
                        .catch(console.error)
                    rootRouter?.getNumberStatus(BigNumber.from(firstNum))
                        .then(setCodeStatus)
                        .then(() => setIsLoadedodeInfo(true))
                        .catch(console.error)
                }
            })
            .then(() => setIsLoaded(true))
            .catch(console.error)
    }, [])

    const selectNumber = (num: string | number) => {
        setIsLoadedodeInfo(false);
        rootRouter?.getMode(BigNumber.from(num))
            .then(setCodeMode)
            .catch(console.error)
        rootRouter?.getNumberStatus(BigNumber.from(num))
            .then(setCodeStatus)
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
                                        (selectedCode===index?'bg-companyL-200 dark:bg-companyD-200':'bg-companyL dark:bg-companyD')}
                                        key={index} onClick={() => {selectNumber(index); setSelectedCode(index)}}>{index}</button>
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                        <div className='text-xl font-medium text-companyL-400 dark:text-companyD-400 py-[10px]'>
                            <button onClick={() => selectNumber(selectedCode)} className='border-1 rounded-lg p-1 ml-0 text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]'>R</button>
                            Status
                        </div>
                        {
                            selectedCode === -1 ? null : (
                                !isLoadedCodeInfo ? <Loader /> : (
                                    <div className='flex flex-col gap-[5px]'>
                                        <p>Code: {selectedCode}</p>
                                        <div>Mode: {codeMode == 0 ? 'Number' : 'Pool'}</div>
                                        {/* subscriptionEndTime */}
                                        <div>End in: {(new Date(codeStatus.subscriptionEndTime * 1000)).toUTCString()}</div>
                                        <div>Hold status: <span className={(codeStatus.isHolded ? 'text-red-600' : 'text-green-600')}>{codeStatus.isHolded ? 'Holded' : 'Not hold'}</span></div>
                                        <div>Lock status: <span className={(codeStatus.isBlocked ? 'text-red-600' : 'text-green-600')}>{codeStatus.isBlocked ? 'Blocked' : 'Not Blocked'}</span></div>
                                        {codeStatus.isHolded ? <div>subscriptionEndTime: {(new Date(codeStatus.holdingEndTime * 1000)).toUTCString()}</div> : null}
                                        <button className='border-1 rounded-lg p-1 m-4 ml-0 w-[200px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]'
                                            onClick={() => onRenewSubscription()}>Renew subscription</button>
                                    </div>
                                )
                            )
                        }
                    </div>
                </div>
            </div>
        );
    }
}

