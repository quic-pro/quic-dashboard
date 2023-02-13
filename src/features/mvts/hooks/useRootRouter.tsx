import {RootRouter} from '@mvts/contract-interfaces-js';
import {useAddErrorNotification, useAddInformationNotification} from 'hooks/useNotifications';
import {useCallback, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {getErrorMessage} from 'utils/getErrorMessage';
import {useAccount} from 'wagmi';

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

function useGetData<K extends keyof RootRouter['functions']>(method: K, args: Parameters<RootRouter[K]>) {
    const rootRouter = useRecoilValue(rootRouterState);

    const addErrorNotification = useAddErrorNotification();

    const [data, setData] = useState<Awaited<ReturnType<RootRouter[K]>> | null>(null);

    const refresh = useCallback(() => {
        setData(null);

        if (!rootRouter) {
            return;
        }

        // @ts-ignore
        rootRouter[method](...args)
            // @ts-ignore
            .then((data) => setData(data))
            .catch((error) => {
                const Content = (
                    <>
                        <span>Failed to get data {method}.</span>
                        <details>{getErrorMessage(error)}</details>
                    </>
                );

                addErrorNotification(Content);
            });
    }, [rootRouter, ...args]);

    useEffect(refresh, [refresh]);

    return {data, refresh};
}


export function useMintPrice() {
    return useGetData<'mintPrice'>('mintPrice', []);
}

export function useSubscriptionPrice() {
    return useGetData<'subscriptionPrice'>('subscriptionPrice', []);
}

export function useDefaultSipDomain() {
    return useGetData<'defaultSipDomain'>('defaultSipDomain', []);
}

export function useCodeStatuses() {
    return useGetData<'getCodeStatuses'>('getCodeStatuses', []);
}

export function useOwnerCodes() {
    const {address} = useAccount();
    return useGetData<'getOwnerCodes'>('getOwnerCodes', [address!]);
}

export function useCodeData(...args: Parameters<RootRouter['getCodeData']>) {
    return useGetData<'getCodeData'>('getCodeData', args);
}

export function useCodeStatus(...args: Parameters<RootRouter['getCodeStatus']>) {
    return useGetData<'getCodeStatus'>('getCodeStatus', args);
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
