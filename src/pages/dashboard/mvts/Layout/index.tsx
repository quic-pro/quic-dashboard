import {getActualRootRouter} from '@mvts/resolver-js';
import {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {useNetwork, useSigner, useSwitchNetwork} from 'wagmi';

import {rootRouterState} from '../../../../features/mvts/state/rootRouter';
import {useAddErrorNotification} from '../../../../hooks/useNotifications';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import MessageAboutSectionPreparation from './MessageAboutSectionPreparation';


export default function Layout() {
    const [isPrepared, setIsPrepared] = useState(false);

    const addErrorNotification = useAddErrorNotification();

    const setRootRouter = useSetRecoilState(rootRouterState);
    const {data: signer} = useSigner();
    const {chain: currentChain} = useNetwork();
    const {switchNetwork} = useSwitchNetwork({
        onSuccess: () => setIsPrepared(true),
    });

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
                    addErrorNotification(`Failed to get root router: ${getErrorMessage(error)}`);
                });
        }

        return () => setRootRouter(null);
    }, [signer, currentChain, switchNetwork]);

    return isPrepared ? <Outlet/> : <MessageAboutSectionPreparation/>;
}
