import { isTestNetwork } from './application';


const MAINNET_INFO = {
    chainId: 1,
    chainName: 'Ethereum',
    rpcUrls:  'https://cloudflare-eth.com/v1/mainnet',
    nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18
    },
    explorer: 'https://etherscan.io/'
};

const SEPOLIA_INFO = {
    chainId: 11155111,
    chainName: 'Sepolia',
    rpcUrls: 'https://cloudflare-eth.com/v1/sepolia',
    nativeCurrency: {
        name: 'Sepolia Ether',
        symbol: 'SepoliaETH',
        decimals: 18
    },
    explorer: 'https://rinkeby.etherscan.io/'
};

export const CHAIN_INFO = isTestNetwork ? SEPOLIA_INFO : MAINNET_INFO;
