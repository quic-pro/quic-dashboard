import {Signer} from '@ethersproject/abstract-signer';
import {getActualRootRouter} from '@mvts/resolver-js';
import {NODE_ENV} from 'constants/environment';
import {useCallback} from 'react';
import {useSetRecoilState} from 'recoil';
import {useNetwork, useSigner, useSwitchNetwork} from 'wagmi';

import {rootRouterState} from '../state/rootRouter';


type Args = {
    onError?: (error: any) => void;
    onSuccess?: () => void;
};


export function useUpdateRootRouter(args?: Args) {
    const setRootRouter = useSetRecoilState(rootRouterState);

    const {data: signer} = useSigner();
    const {chain: currentChain} = useNetwork();
    const {switchNetwork} = useSwitchNetwork(args);

    return useCallback((switchSignerChain = false) => {
        const getSignerOrProvider = !(currentChain && signer && switchNetwork)
            ? undefined
            : (chainId: number): Signer => {
                if (switchSignerChain && (currentChain.id !== chainId)) {
                    switchNetwork(chainId);
                } else {
                    args?.onSuccess?.();
                }

                return signer;
            };

        getActualRootRouter(getSignerOrProvider, NODE_ENV !== 'production')
            .then((router) => {
                setRootRouter(router);
                if (!getSignerOrProvider) {
                    args?.onSuccess?.();
                }
            })
            .catch(args?.onError);
    }, [signer, currentChain]);
}
