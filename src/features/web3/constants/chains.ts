import {NODE_ENV} from 'constants/environment';
import {Chain} from 'wagmi';
import {bsc, bscTestnet, mainnet, polygon, polygonMumbai, sepolia} from 'wagmi/chains';


const MAINNET_CHAINS: Readonly<Chain[]> = [
    mainnet,
    polygon,
    bsc,
];

const TESTNET_CHAINS: Readonly<Chain[]> = [
    sepolia,
    polygonMumbai,
    bscTestnet,
];


export const SUPPORTED_CHAINS = NODE_ENV === 'production' ? MAINNET_CHAINS : TESTNET_CHAINS;
