import {getActualRootRouter} from '@mvts/resolver-js';
import {useEffect, useLayoutEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {useNetwork, useSigner, useSwitchNetwork} from 'wagmi';

import {rootRouterState} from '../../../state/dashboard/mvts';
import MessageAboutSectionPreparation from './MessageAboutSectionPreparation';


export default function Layout() {
    const [isPrepared, setIsPrepared] = useState(false);

    const setRootRouter = useSetRecoilState(rootRouterState);
    const {data: signer} = useSigner();
    const {chain: currentChain} = useNetwork();
    const {switchNetwork} = useSwitchNetwork({
        onSuccess: () => setIsPrepared(true),
    });

    useLayoutEffect(() => {
        if (isPrepared) {
            setIsPrepared(false);
        }
    }, [currentChain]);

    useEffect(() => {
        if (signer && currentChain && switchNetwork) {
            getActualRootRouter((chainId) => {
                if (currentChain.id !== chainId) {
                    switchNetwork(chainId);
                } else {
                    setIsPrepared(true);
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

    return isPrepared ? <Outlet/> : <MessageAboutSectionPreparation/>;
}
