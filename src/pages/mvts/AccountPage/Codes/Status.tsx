import {RootRouter} from '@mvts/contract-interfaces-js';
import {BigNumber} from 'ethers';
import {useLayoutEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useNetwork} from 'wagmi';

import Loader from '../../../../components/Loader';
import {notificationListState, NotificationType} from '../../../../state/app';
import {rootRouterState} from '../../../../state/dashboard/mvts';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import {roundBalance} from '../../../../utils/wallet';


type Props = {
    code: number;
};


export default function Status({code}: Props) {
    const [notificationList, setNotificationList] = useRecoilState(notificationListState);
    const rootRouter = useRecoilValue(rootRouterState);

    const [status, setStatus] = useState<RootRouter.CodeStatusStructOutput | null>(null);
    const [subscriptionPrice, setSubscriptionPrice] = useState<BigNumber | null>(null);

    const {chain} = useNetwork();

    useLayoutEffect(() => loadData(), [rootRouter, code]);

    const loadData = () => {
        if (!rootRouter) {
            return;
        }

        setStatus(null);

        rootRouter.subscriptionPrice()
            .then(setSubscriptionPrice)
            .catch((error) => {
                setNotificationList([...notificationList, {
                    type: NotificationType.ERROR,
                    context: `Failed to get account codes: ${getErrorMessage(error)}.`,
                }]);
            });

        rootRouter.getCodeStatus(code)
            .then(setStatus)
            .catch((error) => {
                setNotificationList([...notificationList, {
                    type: NotificationType.ERROR,
                    context: `Failed to get account codes: ${getErrorMessage(error)}.`,
                }]);
            });
    };

    const handleRenewSubscription = () => {
        if (!subscriptionPrice) {
            return;
        }

        rootRouter?.renewSubscription(code, {value: subscriptionPrice})
            .then(() => {
                setNotificationList([...notificationList, {
                    type: NotificationType.INFORMATION,
                    context: `Code ${code}: Subscription renewal transaction sent.`,
                }]);
            })
            .catch((error) => {
                setNotificationList([...notificationList, {
                    type: NotificationType.ERROR,
                    context: `Failed to send transaction: ${getErrorMessage(error)}.`,
                }]);
            });
    };

    if (status == null) {
        return <Loader/>;
    }

    return (
        <div className="flex-1 flex flex-col bg-gray-100 rounded-lg p-2">
            <div>
                <span>Lock status:</span>
                <span>{status.isBlocked ? 'Is blocked' : 'Not blocked'}</span>
            </div>
            <div>
                <span>Hold status:</span>
                <span>{status.isHeld ? 'Is held' : 'Not held'}</span>
                {status.isHeld && <span>Renew your subscription</span>}
            </div>
            <div>
                <span>Expired:</span>
                {status.isHeld
                    ? <span>{new Date(status.holdEndTime.toNumber() * 1000).toUTCString()}</span>
                    : <span>{new Date(status.subscriptionEndTime.toNumber() * 1000).toUTCString()}</span>}
            </div>
            <div>
                <button onClick={handleRenewSubscription} className="border">Renew subscription</button>
                {subscriptionPrice && (
                    <>
                        <span>{roundBalance(subscriptionPrice, 4)}</span>
                        <span>{chain?.nativeCurrency.symbol}</span>
                    </>
                )}
            </div>
        </div>
    );
}
