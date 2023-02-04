import {RootRouter} from '@mvts/contract-interfaces-js';
import {useCallback, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useAccount} from 'wagmi';

import {NotificationType} from '../../state/app';
import {rootRouterState} from '../../state/dashboard/mvts';
import {getErrorMessage} from '../../utils/getErrorMessage';
import {useAddNotification} from '../notification';


function useSendTransaction<K extends keyof RootRouter['functions']>(method: K) {
    const rootRouter = useRecoilValue(rootRouterState);
    const addNotification = useAddNotification();

    return useCallback((...args: Parameters<RootRouter[K]>) => {
        if (!rootRouter) {
            return;
        }

        // @ts-ignore
        rootRouter[method](...args)
            .then(() => {
                const Content = <span>Transaction {method} has been sent.</span>;

                addNotification(NotificationType.INFORMATION, Content);
            })
            .catch((error) => {
                const Content = (
                    <>
                        <span>Failed to send transaction {method}.</span>
                        <details>{getErrorMessage(error)}</details>
                    </>
                );

                addNotification(NotificationType.ERROR, Content);
            });
    }, [rootRouter]);
}

function useGetData<K extends keyof RootRouter['functions']>(method: K, args: Parameters<RootRouter[K]>) {
    const rootRouter = useRecoilValue(rootRouterState);
    const addNotification = useAddNotification();

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

                addNotification(NotificationType.ERROR, Content);
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

export function useBlockedCodes() {
    return useGetData<'getBlockedCodes'>('getBlockedCodes', []);
}

export function useHeldCodes() {
    return useGetData<'getHeldCodes'>('getHeldCodes', []);
}

export function useAvailableForMintCodes() {
    return useGetData<'getAvailableForMintCodes'>('getAvailableForMintCodes', []);
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

export function useSetCodeRouter() {
    return useSendTransaction<'setCodeRouter'>('setCodeRouter');
}
