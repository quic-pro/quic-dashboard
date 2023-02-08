import {RootRouter} from '@mvts/contract-interfaces-js';
import {atom} from 'recoil';


export const rootRouterState = atom<RootRouter | null>({
    key: 'rootRouter',
    default: null,
    dangerouslyAllowMutability: true,
});
