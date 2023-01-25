import {getActualRootRouter} from '@mvts/resolver-js';
import {useLayoutEffect} from 'react';
import {Outlet} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {useNetwork, useSigner, useSwitchNetwork} from 'wagmi';

import {rootRouterState} from '../../state/dashboard/mvts';


export default function Layout() {
    const setRootRouter = useSetRecoilState(rootRouterState);
    const {data: signer} = useSigner();
    const {chain: currentChain} = useNetwork();
    const {switchNetwork} = useSwitchNetwork();

    useLayoutEffect(() => {
        if (signer && currentChain && switchNetwork) {
            getActualRootRouter((chainId) => {
                if (currentChain.id !== chainId) {
                    switchNetwork(chainId);
                }
                return signer;
            })
                .then((rootRouter) => {
                    setRootRouter(rootRouter);
                })
                .catch((error) => {
                    // TODO: Show notification
                    console.error(error);
                });
        }

        return () => setRootRouter(null);
    }, [signer, currentChain, switchNetwork]);

    return <Outlet/>;
}
