import { isProduction } from './application';


const MAINNET = 1;
const RINKEBY = 4;


export const CHAIN_ID: number = isProduction ? MAINNET : RINKEBY;
