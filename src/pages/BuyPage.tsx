import React, { useEffect, useState } from 'react';
import { rootRouter } from '../contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { useWeb3React } from '@web3-react/core';
import Loader from '../components/Loader';
import { formatEther } from '@ethersproject/units';
import { CHAIN_INFO } from '../constants/chain';


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
            rootRouter?.buy(BigNumber.from(num), { value: buyPrice, gasLimit: 1000000 })
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
        return <Loader />
    } else {
        return (
            <div className='mx-0 md:mx-[30px] flex flex-row justify-center'>
                <div className='bg-companyL dark:bg-companyD w-[800px] rounded-lg'>
                    <div className='m-[10px] p-[10px] bg-white rounded-lg'>
                        <div className='text-3xl font-medium text-companyL-400 dark:text-companyD-400 pb-[5px]'>
                            QUIC-PRO Shop
                        </div>
                        <div className='text-xl font-medium text-companyBottomL dark:text-companyBottomD py-[5px]'>
                            Buy price: {Number(formatEther(buyPrice)).toFixed(3)} {CHAIN_INFO.nativeCurrency.symbol}
                        </div>
                        <div className='flex flex-col gap-[10px] my-[10px]'>
                            <div>
                                Input number:

                                <input
                                    className='ml-2 p-1 pl-[10px] bg-companyL'
                                    type="text"
                                    placeholder="Number"
                                    value={number}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <button className='border-1 rounded-lg w-[70px] h-[40px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px] p-1'
                                    onClick={() => onBuy(number)}>Buy</button>
                                {numberIsAvailableForBuy ? null : <span className='text-[#ff0000] ml-[10px]'>Number is not avaliable</span>}
                            </div>
                        </div>
                        <div>Or selected number:</div>
                        <div className='my-[10px] grid grid-cols-4 md:grid-cols-8 gap-[5px]'>
                            {availableForBuyNumbers.map((code, index) => {
                                if (code) {
                                    return <button className="border-1 rounded-lg w-[70px] h-[40px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]" key={index} onClick={() => onBuy(index)}>{index}</button>
                                } else {
                                    return null;
                                }
                            })}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

