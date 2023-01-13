import {BigNumber} from '@ethersproject/bignumber';
import {formatEther} from '@ethersproject/units';
import {RootRouter} from '@mvts/contract-interfaces-js';
import {getActualRootRouter} from '@mvts/resolver-js';
import {useWeb3React} from '@web3-react/core';
import React, {ChangeEvent, useEffect, useState} from 'react';

import Loader from '../components/Loader';
import {CHAIN_INFO} from '../constants/chain';


export default function BuyPage() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mintPrice, setMintPrice] = useState(BigNumber.from(0));
    const [number, setNumber] = useState('');
    const [numberIsAvailableForBuy, setNumberIsAvailableForBuy] = useState(true);
    const [availableForBuyNumbers, setAvailableForBuyNumbers] = useState([] as boolean[]);
    const [rootRouter, setRootRouter] = useState<RootRouter | null>(null);

    const {provider} = useWeb3React();

    useEffect(() => {
        if (!provider) {
            return;
        }

        void getActualRootRouter(() => provider.getSigner())
            .then(setRootRouter)
            .catch();
    }, [provider]);

    useEffect(() => {
        if (!rootRouter) {
            return;
        }

        rootRouter.mintPrice()
            .then(setMintPrice)
            .catch(console.error);

        rootRouter.getAvailableForMintCodes()
            .then(setAvailableForBuyNumbers)
            .then(() => setIsLoaded(true))
            .catch(console.error);
    }, [rootRouter]);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const result = event.target.value.replace(/\D/g, '');
        setNumber(result);

        const code = +result;

        if (!availableForBuyNumbers[code] || (+result < 0) || (+result >= 1000)) {
            setNumberIsAvailableForBuy(false);
        } else {
            setNumberIsAvailableForBuy(true);
        }
    };

    const onBuy = (num: number | string) => {
        if (availableForBuyNumbers[+num]) {
            setIsLoaded(false);
            setNumber('');
            rootRouter?.mint(BigNumber.from(num), {value: mintPrice, gasLimit: 1000000})
                .then(() => {
                    rootRouter.getAvailableForMintCodes()
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
    };

    if (!isLoaded) {
        return <Loader />;
    } else {
        return (
            <div className='mx-0 md:mx-[30px] flex flex-row justify-center'>
                <div className='w-[800px] rounded-sm shadow-lg shadow-gray-400/30 border-[1px]'>
                    <div className='m-[10px] p-[10px] bg-white rounded-sm'>
                        <div className='text-3xl font-medium text-companyL-400 dark:text-companyD-400 pb-[5px]'>
                            QUIC-PRO Shop
                        </div>
                        <div className='text-xl font-medium text-companyBottomL dark:text-companyBottomD py-[5px]'>
                            Buy price: {Number(formatEther(mintPrice)).toFixed(3)} {CHAIN_INFO.nativeCurrency.symbol}
                        </div>
                        <div className='flex flex-col gap-[10px] my-[10px]'>
                            <div>
                                Input number*:

                                <input
                                    className='ml-2 p-1 pl-[10px] bg-companyL'
                                    type="text"
                                    placeholder="Number"
                                    value={number}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className='text-xs'>
                            *The number consists of three digits and cannot start with a zero
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
                                    return <button className="border-1 rounded-lg w-[70px] h-[40px] text-companyL-400 dark:text-companyD-400 bg-companyL dark:bg-companyD hover:bg-companyL-200 dark:hover:bg-companyD-200 border-[1px]" key={index} onClick={() => onBuy(index)}>{index}</button>;
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

