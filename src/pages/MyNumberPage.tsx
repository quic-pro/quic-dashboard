import React, {useEffect, useState} from 'react';
import {rootRouter} from '../contracts';
import {BigNumber} from '@ethersproject/bignumber';
import {useWeb3React} from '@web3-react/core';
import Loader from '../components/Loader';
import {formatEther} from '@ethersproject/units';
import {CHAIN_INFO} from '../constants/chain';


export default function MyNumberPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedCodeInfo, setIsLoadedodeInfo] = useState(false);
    const [selectedCode, setSelectedCode] = useState(-1);
    const [subscriptionPrice, setSubscriptionPrice] = useState(BigNumber.from(0));
    const [myNumbers, setMyNumbers] = useState([] as boolean[]);
    const [codeStatus, setCodeStatus] = useState<any>(null);
    const [codeMode, setCodeMode] = useState(0);

    const {account, ENSName} = useWeb3React();

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
        return <Loader/>
    } else {
        return (
            <>
                My numbers:
                {myNumbers.length === 0 ? 'You don\' have numbers' : null}
                {myNumbers.map((code, index) => {
                    if (code) {
                        return <button className="border-1 rounded-lg w-[70px] bg-companyL p-1 m-2" key={index} onClick={() => selectNumber(index)}>{index}</button>
                    } else {
                        return null;
                    }
                })}
                {
                    selectedCode === -1 ? null : (
                        !isLoadedCodeInfo ? <Loader/> : (
                            <>
                                <div>Mode: {codeMode == 0 ? 'Number' : 'Pool'}</div>
                                <div>subscriptionEndTime: {(new Date(codeStatus.subscriptionEndTime * 1000)).toUTCString()}</div>
                                <div>isBlocked: {codeStatus.isBlocked ? 'true' : 'false'}</div>
                                <div>isHolded: {codeStatus.isHolded ? 'true' : 'false'}</div>
                                {codeStatus.isHolded ? <div>subscriptionEndTime: {(new Date(codeStatus.holdingEndTime * 1000)).toUTCString()}</div> : null}
                                <button className='border-1 rounded-lg bg-companyL p-1 m-4 ml-0' onClick={() => onRenewSubscription()}>Renew subscription</button>
                            </>
                        )
                    )
                }
            </>
        );
    }
}

