import {Chain} from 'wagmi';
import {
    arbitrum, arbitrumGoerli,
    avalanche, avalancheFuji,
    bsc, bscTestnet,
    evmos, evmosTestnet,
    fantom, fantomTestnet,
    foundry,
    gnosis, goerli,
    hardhat,
    iotex, iotexTestnet, localhost,
    mainnet,
    optimism, optimismGoerli,
    polygon, polygonMumbai,
    sepolia,
    taraxa, taraxaTestnet,
    zkSync, zkSyncTestnet,
} from 'wagmi/chains';

import {NODE_ENV} from './environment';


const MAINNET_CHAINS: Readonly<Chain[]> = [
    arbitrum,
    avalanche,
    bsc,
    evmos,
    fantom,
    foundry,
    gnosis,
    iotex,
    mainnet,
    optimism,
    polygon,
    taraxa,
    zkSync,
];

const TESTNET_CHAINS: Readonly<Chain[]> = [
    arbitrumGoerli,
    avalancheFuji,
    bscTestnet,
    evmosTestnet,
    fantomTestnet,
    goerli,
    hardhat,
    iotexTestnet,
    localhost,
    optimismGoerli,
    polygonMumbai,
    sepolia,
    taraxaTestnet,
    zkSyncTestnet,
];


export const SUPPORTED_CHAINS = NODE_ENV === 'production' ? MAINNET_CHAINS : TESTNET_CHAINS;
