import {Connector} from '@web3-react/types';

import METAMASK_ICON_URL from '../assets/images/metamask.png';
import INJECTED_ICON_URL from '../assets/svg/arrow-right.svg';
import COINBASE_ICON_URL from '../assets/svg/coinbaseWalletIcon.svg';
import WALLETCONNECT_ICON_URL from '../assets/svg/walletConnectIcon.svg';
import {coinbaseWallet, injected, Wallet, walletConnect} from '../connectors';


type WalletInfo = {
    connector?: Connector;
    wallet?: Wallet;
    name: string;
    iconURL: string;
    description: string;
    href: string | null;
    color: string;
    primary?: true;
    mobile?: true;
    mobileOnly?: true;
};


export const SUPPORTED_WALLETS: Record<string, WalletInfo> = {
    INJECTED: {
        connector: injected,
        wallet: Wallet.INJECTED,
        name: 'Injected',
        iconURL: INJECTED_ICON_URL,
        description: 'Injected web3 provider.',
        href: null,
        color: '#010101',
        primary: true
    },
    METAMASK: {
        connector: injected,
        wallet: Wallet.INJECTED,
        name: 'MetaMask',
        iconURL: METAMASK_ICON_URL,
        description: 'Easy-to-use browser extension.',
        href: null,
        color: '#E8831D'
    },
    METAMASK_LINK: {
        name: 'Open in MetaMask Wallet',
        iconURL: METAMASK_ICON_URL,
        description: 'Open in MetaMask Wallet app.',
        href: `https://metamask.app.link/dapp/${(new URL(window.origin)).host}`,
        color: '#E8831D',
        mobile: true,
        mobileOnly: true
    },
    COINBASE_WALLET: {
        connector: coinbaseWallet,
        wallet: Wallet.COINBASE_WALLET,
        name: 'Coinbase Wallet',
        iconURL: COINBASE_ICON_URL,
        description: 'Use Coinbase Wallet app on mobile device',
        href: null,
        color: '#315CF5'
    },
    COINBASE_LINK: {
        name: 'Open in Coinbase Wallet',
        iconURL: COINBASE_ICON_URL,
        description: 'Open in Coinbase Wallet app.',
        href: `https://go.cb-w.com/dapp?cb_url=${(new URL(window.origin)).host}`,
        color: '#315CF5',
        mobile: true,
        mobileOnly: true
    },
    WALLET_CONNECT: {
        connector: walletConnect,
        wallet: Wallet.WALLET_CONNECT,
        name: 'WalletConnect',
        iconURL: WALLETCONNECT_ICON_URL,
        description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
        href: null,
        color: '#4196FC',
        mobile: true
    }
};
