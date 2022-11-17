import { isProduction } from './application';


const MAINNET_URL = 'https://cloudflare-eth.com/v1/mainnet';
const RINKEBY_URL = 'https://cloudflare-eth.com/v1/rinkeby';


export const NETWORK_URL = isProduction ? MAINNET_URL : RINKEBY_URL;
