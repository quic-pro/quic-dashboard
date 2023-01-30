import {useCallback, useEffect, useState} from 'react';
import {useRecoilValue} from 'recoil';
import {useAccount} from 'wagmi';

import {NotificationType} from '../../state/app';
import {rootRouterState} from '../../state/dashboard/mvts';
import {getErrorMessage} from '../../utils/getErrorMessage';
import {useAddNotification} from '../notification';


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
                addNotification(NotificationType.ERROR, `Failed to get account codes.<br/>DETAILS: ${getErrorMessage(error)}`);
            });
    }, [rootRouter, address]);

    useEffect(refresh, [refresh]);

    return {data, refresh};
}
