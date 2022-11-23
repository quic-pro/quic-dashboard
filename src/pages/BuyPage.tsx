import React, {useEffect, useState} from 'react';
import {rootRouter} from '../contracts';
import {BigNumber} from '@ethersproject/bignumber';
import {useWeb3React} from '@web3-react/core';
import Loader from '../components/Loader';
import {formatEther} from '@ethersproject/units';
import {CHAIN_INFO} from '../constants/chain';


export default function BuyPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [buyPrice, setBuyPrice] = useState(BigNumber.from(0));
    const [number, setNumber] = useState('');
    const [numberIsAvailableForBuy, setNumberIsAvailableForBuy] = useState(true);
    const [availableForBuyNumbers, setAvailableForBuyNumbers] = useState([] as boolean[]);

    useEffect(() => {
        rootRouter?.buyPrice()
            .then(setBuyPrice)
            .catch(console.error)

        rootRouter?.getAvailableForBuyNumbers()
            .then(setAvailableForBuyNumbers)
            .then(() => setIsLoaded(true))
            .catch(console.error)
    }, [])

    const handleChange = (event: any) => {
        const result = event.target.value.replace(/\D/g, '');
        setNumber(result);

        if (!availableForBuyNumbers[+number]) {
            setNumberIsAvailableForBuy(false);
        }
    };

    const onBuy = (num: number | string) => {
        if (availableForBuyNumbers[+num]) {
            setIsLoaded(false);
            rootRouter?.buy(BigNumber.from(num), {value: buyPrice, gasLimit: 1000000})
                .then(() => {
                    rootRouter?.getAvailableForBuyNumbers()
                        .then(setAvailableForBuyNumbers)
                        .then(() => setIsLoaded(true))
                        .catch(console.error)
                })
                .catch(console.error);
        }
    }

    if (!isLoaded) {
        return <Loader/>
    } else {
        return (
            <>
                Buy price: {Number(formatEther(buyPrice)).toFixed(3)} {CHAIN_INFO.nativeCurrency.symbol}
                <div>
                    Input numbers:
                    <input
                        className='bg-companyL'
                        type="text"
                        placeholder="Number"
                        value={number}
                        onChange={handleChange}
                    />
                    <button className='border-1 w-[70px] bg-companyL p-1 m-2' onClick={() => onBuy(number)}>Buy</button>
                    {numberIsAvailableForBuy ? null : <span className='text-red'>Number is not avaliable for buying</span>}
                </div>
                <div>Or selected numbers:</div>
                {availableForBuyNumbers.map((code, index) => {
                    if (code) {
                        return <button className="border-1 w-[70px] bg-companyL p-1 m-2" key={index} onClick={() => onBuy(index)}>{index}</button>
                    } else {
                        return null;
                    }
                })}
            </>
        );
    }
}

