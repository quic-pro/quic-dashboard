import {getActualRootRouter} from '@mvts/resolver-js';
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
        if (currentChain && signer && switchNetwork) {
            getActualRootRouter((chainId) => {
                if (switchSignerChain && (currentChain.id !== chainId)) {
                    switchNetwork(chainId);
                } else {
                    args?.onSuccess?.();
                }

                return signer;
            })
                .then(setRootRouter)
                .catch(args?.onError);
        }
    }, [signer, currentChain]);
}