import {Connector} from 'wagmi';
import {CoinbaseWalletConnector} from 'wagmi/connectors/coinbaseWallet';
import {InjectedConnector} from 'wagmi/connectors/injected';
import {LedgerConnector} from 'wagmi/connectors/ledger';
import {WalletConnectConnector} from 'wagmi/connectors/walletConnect';

import {MetaMaskConnector} from '../lib/connectors/metaMaskConnector';


export const injectedConnector = new InjectedConnector({
    options: {
        name: 'Injected',
        shimDisconnect: true,
    },
});

export const metaMaskConnector = new MetaMaskConnector({
    options: {
        // eslint-disable-next-line camelcase
        UNSTABLE_shimOnConnectSelectAccount: true,
    },
});

export const coinbaseWalletConnector = new CoinbaseWalletConnector({
    options: {
        appName: 'MVTS',
    },
});

export const walletConnectConnector = new WalletConnectConnector({
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
