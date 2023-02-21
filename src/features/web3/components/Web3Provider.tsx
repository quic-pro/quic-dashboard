import {INFURA_API_KEY} from 'constants/environment';
import {ReactNode} from 'react';
import {configureChains, createClient, WagmiConfig} from 'wagmi';
import {infuraProvider} from 'wagmi/providers/infura';
import {publicProvider} from 'wagmi/providers/public';

import {SUPPORTED_CHAINS} from '../constants/chains';
import {SUPPORTED_CONNECTORS} from '../constants/connectors';


type Props = {
    children?: ReactNode;
};


export default function Web3Provider({children}: Props) {
    const {provider, webSocketProvider} = configureChains(
        [...SUPPORTED_CHAINS],
        [
            publicProvider(),
            infuraProvider({apiKey: INFURA_API_KEY}),
        ],
        {
            stallTimeout: 5000,
        },
    );

    const client = createClient({
        autoConnect: true,
        connectors: [...SUPPORTED_CONNECTORS],
        provider,
        webSocketProvider,
    });

    return (
        <WagmiConfig client={client}>
            {children}
        </WagmiConfig>
    );
}
