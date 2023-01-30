import {RootRouter} from '@mvts/contract-interfaces-js';
import {BigNumberish} from 'ethers';
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


export function useAccountCodes() {
    const rootRouter = useRecoilValue(rootRouterState);

    const [data, setData] = useState<number[] | null>(null);

    const {address} = useAccount();
    const addNotification = useAddNotification();

    const refresh = useCallback(() => {
        setData(null);

        if (!rootRouter || !address) {
            return;
        }

        rootRouter.getOwnerCodes(address)
            .then((ownerCodes) => {
                const accountCodes: number[] = [];
                ownerCodes.forEach((ownedByAccount, index) => ownedByAccount && accountCodes.push(index));
                setData(accountCodes);
            })
            .catch((error) => {
                addNotification(NotificationType.ERROR, `Failed to get account codes. DETAILS: ${getErrorMessage(error)}`);
            });
    }, [rootRouter, address]);

    useEffect(refresh, [refresh]);

    return {data, refresh};
}

export function useCodeData(code: BigNumberish) {
    const rootRouter = useRecoilValue(rootRouterState);

    const [data, setData] = useState<RootRouter.CodeStructOutput | null>(null);

    const addNotification = useAddNotification();

    const refresh = useCallback(() => {
        setData(null);

        if (!rootRouter) {
            return;
        }

        rootRouter.getCodeData(code)
            .then(setData)
            .catch((error) => {
                addNotification(NotificationType.ERROR, `Failed to get code data. DETAILS: ${getErrorMessage(error)}`);
            });
    }, [rootRouter, code]);

    useEffect(refresh, [refresh]);

    return {data, refresh};
}

export function useChangeCodeMode() {
    return useSendTransaction<'changeCodeMode'>('changeCodeMode');
}

export function useSetCodeRouter() {
    return useSendTransaction<'setCodeRouter'>('setCodeRouter');
}
