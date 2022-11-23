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

        if (!availableForBuyNumbers[+result] || (+result < 0) || (+result >= 1000)) {
            setNumberIsAvailableForBuy(false);
        } else {
            setNumberIsAvailableForBuy(true);
        }
    };

    const onBuy = (num: number | string) => {
        if (availableForBuyNumbers[+num]) {
            setIsLoaded(false);
            setNumber('');
            rootRouter?.buy(BigNumber.from(num), {value: buyPrice, gasLimit: 1000000})
                .then(() => {
                    rootRouter?.getAvailableForBuyNumbers()
                        .then(setAvailableForBuyNumbers)
                        .then(() => setIsLoaded(true))
                        .catch((err) => {
                            console.error(err);
                            setIsLoaded(true);
                        });
                })
                .catch((err) => {
                    console.error(err);
                    setIsLoaded(true);
                });
        }
    }

    if (!isLoaded) {
        return <Loader/>
    } else {
        return (
            <>
                Buy price: {Number(formatEther(buyPrice)).toFixed(3)} {CHAIN_INFO.nativeCurrency.symbol}
                <div>
                    Input number:
                    <input
                        className='ml-2 p-1 bg-companyL'
                        type="text"
                        placeholder="Number"
                        value={number}
                        onChange={handleChange}
                    />
                    <button className='border-1 rounded-lg w-[70px] bg-companyL p-1 m-4' onClick={() => onBuy(number)}>Buy</button>
                    {numberIsAvailableForBuy ? null : <span className='text-[#ff0000]'>Number is not avaliable for buying</span>}
                </div>
                <div>Or selected numbers:</div>
                {availableForBuyNumbers.map((code, index) => {
                    if (code) {
                        return <button className="border-1 rounded-lg w-[70px] bg-companyL p-1 m-4 ml-0" key={index} onClick={() => onBuy(index)}>{index}</button>
                    } else {
                        return null;
                    }
                })}
            </>
        );
    }
}

