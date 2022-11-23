import React, {useEffect, useState} from 'react';
import {rootRouter} from '../contracts';
import {BigNumber} from '@ethersproject/bignumber';
import {useWeb3React} from '@web3-react/core';
import Loader from '../components/Loader';


export default function NumberManagementPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoadedCodeInfo, setIsLoadedodeInfo] = useState(false);
    const [selectedCode, setSelectedCode] = useState(-1);
    const [subscriptionPrice, setSubscriptionPrice] = useState(BigNumber.from(0));
    const [myNumbers, setMyNumbers] = useState([] as boolean[]);
    const [codeInfo, setCodeInfo] = useState<any>(null);
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
        rootRouter?.getMode(BigNumber.from(num))
            .then(setCodeMode)
            .catch(console.error)
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
                    selectedCode === -1
                        ? null
                        : !isLoadedCodeInfo ? <Loader/> : (codeMode == 0 ? <NumberSettings/> : <PoolSettings/>)
                }
            </>
        );
    }
}

function NumberSettings() {
    return <div></div>
}

function PoolSettings() {
    return <div></div>
}
