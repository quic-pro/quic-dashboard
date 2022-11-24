import '@uniswap/widgets/fonts.css';

import {SwapWidget} from '@uniswap/widgets';
import {useWeb3React} from '@web3-react/core';
import React from 'react';


const theme = {
    primary: '#09a2ff',
    secondary: '#6bbff1',
    interactive: '#f1f7fc',
    container: '#f1f7fc',
    module: '#fff',
    accent: '#3b99e0',
    outline: '#3b99e0',
    dialog: '#f1f7fc',
    fontFamily: 'Montserrat',
    borderRadius: 0.5
};


export default function SwapPage() {
    const {provider} = useWeb3React();

    return (
        <div className='bg-white dark:bg-white mx-0 md:mx-[30px] flex items-center justify-center'>
            {/* <div className="mx-[30px] md:mx-0 p-[10px] max-h-[370px] max-w-[600px] bg-white dark:bg-white rounded-lg shadow-lg shadow-gray-400/30"> */}
                <div className="flex flex-col items-center justify-center shadow-lg shadow-gray-400/30 border-[1px]">
                    <SwapWidget width="100%" provider={provider} theme={theme}/>
                </div>
            {/* </div> */}
        </div>
    );
}
