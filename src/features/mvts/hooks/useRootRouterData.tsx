import {RootRouter} from '@mvts/contract-interfaces-js';
import {useAddErrorNotification} from 'hooks/useAddNotification';
import {useCallback, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {getErrorMessage} from 'utils/error';

import {rootRouterState} from '../state/rootRouter';


function useGetData<K extends keyof RootRouter['functions']>(method: K, args: Parameters<RootRouter[K]>) {
    const rootRouter = useRecoilValue(rootRouterState);

    const addErrorNotification = useAddErrorNotification();

    const [data, setData] = useState<Awaited<ReturnType<RootRouter[K]>> | null>(null);

    const refresh = useCallback((callback?: (data: Awaited<ReturnType<RootRouter[K]>>) => void) => {
        setData(null);

        if (!rootRouter) {
            return;
        }

        // @ts-ignore
        rootRouter[method](...args)
            .then((data) => {
                // @ts-ignore
                setData(data);
                // @ts-ignore
                callback?.(data);
            })
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

export function useModeChangePrice() {
    return useGetData<'modeChangePrice'>('modeChangePrice', []);
}

export function useDefaultSipDomain() {
    return useGetData<'defaultSipDomain'>('defaultSipDomain', []);
}

export function useCodeStatuses() {
    return useGetData<'getCodeStatuses'>('getCodeStatuses', []);
}

export function useOwnerCodes(...args: Parameters<RootRouter['getOwnerCodes']>) {
    return useGetData<'getOwnerCodes'>('getOwnerCodes', args);
}

export function useCodeData(...args: Parameters<RootRouter['getCodeData']>) {
    return useGetData<'getCodeData'>('getCodeData', args);
}

export function useCodeStatus(...args: Parameters<RootRouter['getCodeStatus']>) {
    return useGetData<'getCodeStatus'>('getCodeStatus', args);
}
