import { CoinbaseWallet } from '@web3-react/coinbase-wallet';
import { initializeConnector, Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';
import { Connector } from '@web3-react/types';
import { WalletConnect } from '@web3-react/walletconnect';
import { useMemo } from 'react';

import { CHAIN_INFO } from '../constants/chain';


export enum Wallet {
    INJECTED = 'INJECTED',
    COINBASE_WALLET = 'COINBASE_WALLET',
    WALLET_CONNECT = 'WALLET_CONNECT'
}


export const BACKFILLABLE_WALLETS = [Wallet.COINBASE_WALLET, Wallet.WALLET_CONNECT, Wallet.INJECTED];


function onError(error: Error) {
    console.debug(`web3-react error: ${error}`);
}

export function getWalletForConnector(connector: Connector) {
    switch (connector) {
        case injected:
            return Wallet.INJECTED;
        case coinbaseWallet:
            return Wallet.COINBASE_WALLET;
        case walletConnect:
            return Wallet.WALLET_CONNECT;
        default:
            throw Error('Unsupported connector');
    }
}

export function getConnectorForWallet(wallet: Wallet) {
    switch (wallet) {
        case Wallet.INJECTED:
            return injected;
        case Wallet.COINBASE_WALLET:
            return coinbaseWallet;
        case Wallet.WALLET_CONNECT:
            return walletConnect;
        default:
            throw Error('Unsupported wallet');
    }
}

function getHooksForWallet(wallet: Wallet) {
    switch (wallet) {
        case Wallet.INJECTED:
            return injectedHooks;
        case Wallet.COINBASE_WALLET:
            return coinbaseWalletHooks;
        case Wallet.WALLET_CONNECT:
            return walletConnectHooks;
        default:
            throw Error('Unsupported wallet');
    }
}

export const [injected, injectedHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions, onError }));

export const [walletConnect, walletConnectHooks] = initializeConnector<WalletConnect>(
    (actions) => new WalletConnect({
        actions,
        options: {
            rpc: CHAIN_INFO.rpcUrls,
            qrcode: true
        },
        onError
    })
);

export const [coinbaseWallet, coinbaseWalletHooks] = initializeConnector<CoinbaseWallet>(
    (actions) => new CoinbaseWallet({
        actions,
        options: {
            url: CHAIN_INFO.rpcUrls,
            appName: 'MVTS',
            reloadOnDisconnect: false
        },
        onError
    })
);

type ConnectorListItem = {
    connector: Connector;
    hooks: Web3ReactHooks;
};

function getConnectorListItemForWallet(wallet: Wallet) {
    return {
        connector: getConnectorForWallet(wallet),
        hooks: getHooksForWallet(wallet)
    };
}

export function useConnectors(selectedWallet?: Wallet) {
    return useMemo(() => {
        const connectors: ConnectorListItem[] = [];
        if (selectedWallet) {
            connectors.push(getConnectorListItemForWallet(selectedWallet));
        }
        connectors.push(
            ...BACKFILLABLE_WALLETS
                .filter((wallet) => wallet !== selectedWallet)
                .map(getConnectorListItemForWallet)
        );

        return connectors.map(({ connector, hooks }) => [
            connector,
            hooks
        ]) as [Connector, Web3ReactHooks][];
    }, [selectedWallet]);
}
