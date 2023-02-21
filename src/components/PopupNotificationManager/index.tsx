import {useRemoveNotification} from 'hooks/useRemoveNotification';
import {useLayoutEffect} from 'react';
import {useRecoilValue, useResetRecoilState} from 'recoil';
import {notificationsState, popupNotificationCloseTimeoutState} from 'state/notifications';

import PopupNotification from './PopupNotification';


export default function PopupNotificationManager() {
    const notifications = useRecoilValue(notificationsState);
    const popupNotificationCloseTimeout = useRecoilValue(popupNotificationCloseTimeoutState);
    const resetNotifications = useResetRecoilState(notificationsState);

    const removeNotification = useRemoveNotification();

    useLayoutEffect(() => {
        if (!notifications.length) {
            return;
        }

        const {id, timestamp} = notifications[0];
        const delay = popupNotificationCloseTimeout - (Date.now() - timestamp);
        const timeoutId = setTimeout(() => removeNotification(id), delay);

        return () => clearTimeout(timeoutId);
    }, [notifications]);


    const handleClosingAll = () => {
        resetNotifications();
    };

    return (
        <div className="fixed flex-col bottom-0 right-0">
            {notifications.length > 1 && <button onClick={handleClosingAll}>Close all</button>}
            {notifications.map((notificationData) => <PopupNotification key={notificationData.id} data={notificationData}/>)}
        </div>
    );
}
