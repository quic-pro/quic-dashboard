import {RootRouter} from '@mvts/contract-interfaces-js';
import {useAddErrorNotification, useAddInformationNotification} from 'hooks/useAddNotification';
import {useCallback} from 'react';
import {useRecoilValue} from 'recoil';
import {getErrorMessage} from 'utils/error';

import {rootRouterState} from '../state/rootRouter';


function useSendTransaction<K extends keyof RootRouter['functions']>(method: K) {
    const rootRouter = useRecoilValue(rootRouterState);

    const addInformationNotification = useAddInformationNotification();
    const addErrorNotification = useAddErrorNotification();

    return useCallback((...args: Parameters<RootRouter[K]>) => {
        if (!rootRouter) {
            return;
        }

        // @ts-ignore
        rootRouter[method](...args)
            .then(() => {
                const Content = <span>Transaction {method} has been sent.</span>;

                addInformationNotification(Content);
            })
            .catch((error) => {
                const Content = (
                    <>
                        <span>Failed to send transaction {method}.</span>
                        <details>{getErrorMessage(error)}</details>
                    </>
                );

                addErrorNotification(Content);
            });
    }, [rootRouter]);
}


export function useMint() {
    return useSendTransaction<'mint'>('mint');
}

export function useRenewSubscription() {
    return useSendTransaction<'renewSubscription'>('renewSubscription');
}

export function useChangeCodeMode() {
    return useSendTransaction<'changeCodeMode'>('changeCodeMode');
}

export function useSetCodeSipDomain() {
    return useSendTransaction<'setCodeSipDomain'>('setCodeSipDomain');
}

export function useClearCodeSipDomain() {
    return useSendTransaction<'clearCodeSipDomain'>('clearCodeSipDomain');
}

export function useSetCodeRouter() {
    return useSendTransaction<'setCodeRouter'>('setCodeRouter');
}

export function useClearCodeRouter() {
    return useSendTransaction<'clearCodeRouter'>('clearCodeRouter');
}

export function useRenounceOwnershipOfCode() {
    return useSendTransaction<'renounceOwnershipOfCode'>('renounceOwnershipOfCode');
}

export function useSafeTransferFrom() {
    return useSendTransaction<'safeTransferFrom(address,address,uint256)'>('safeTransferFrom(address,address,uint256)');
}
