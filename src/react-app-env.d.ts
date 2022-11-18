/// <reference types="react-scripts" />
interface Window {
    ethereum?: {
        isCoinbaseWallet?: boolean;
        isMetaMask?: boolean;
        autoRefreshOnNetworkChange?: boolean;
    };
    web3?: any;
};
