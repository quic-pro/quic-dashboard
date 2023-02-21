import {MetaMaskConnector} from 'lib/wagmi/connectors';
import {Connector} from 'wagmi';
import {CoinbaseWalletConnector} from 'wagmi/connectors/coinbaseWallet';
import {InjectedConnector} from 'wagmi/connectors/injected';
import {LedgerConnector} from 'wagmi/connectors/ledger';
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect';

import {SUPPORTED_CHAINS} from './chains';


export const injectedConnector = new InjectedConnector({
    chains: [...SUPPORTED_CHAINS],
    options: {
        name: 'Injected',
        shimDisconnect: true,
    },
});

export const metaMaskConnector = new MetaMaskConnector({
    chains: [...SUPPORTED_CHAINS],
    options: {
        // eslint-disable-next-line camelcase
        UNSTABLE_shimOnConnectSelectAccount: true,
    },
});

export const coinbaseWalletConnector = new CoinbaseWalletConnector({
    chains: [...SUPPORTED_CHAINS],
    options: {
        appName: 'MVTS',
    },
});

export const walletConnectConnector = new WalletConnectConnector({
    chains: [...SUPPORTED_CHAINS],
    options: {
        qrcode: true,
    },
});

export const ledgerConnector = new LedgerConnector();

export const SUPPORTED_CONNECTORS: Readonly<Connector[]> = [
    injectedConnector,
    metaMaskConnector,
    coinbaseWalletConnector,
    walletConnectConnector,
    ledgerConnector,
];
