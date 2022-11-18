import { Web3ReactProvider } from '@web3-react/core';
import React, { useEffect } from 'react';

import { injected, useConnectors } from '../connectors';
import { isMobileOrTable } from '../utils/userAgent';


type Props = {
    children: React.ReactNode;
};


export default function Web3Provider({ children }: Props) {
    useEffect(() => {
        const isMetaMask = !!window.ethereum?.isMetaMask;
        if (isMobileOrTable && isMetaMask) {
            injected.activate();
        }
    }, []);

    return <Web3ReactProvider connectors={useConnectors()}>{children}</Web3ReactProvider>;
}
