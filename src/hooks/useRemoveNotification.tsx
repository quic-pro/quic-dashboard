import {useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {notificationsState} from 'state/notifications';


export function useRemoveNotification() {
    const [notifications, setNotifications] = useRecoilState(notificationsState);

    return useCallback((id: number) => {
        setNotifications(notifications.filter((notificationData) => notificationData.id !== id));
    }, [notifications, setNotifications]);
}
