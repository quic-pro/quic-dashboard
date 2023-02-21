import {ReactNode, useCallback} from 'react';
import {useRecoilState} from 'recoil';
import {notificationsState, NotificationType} from 'state/notifications';


function useAddNotification(type: NotificationType) {
    const [notifications, setNotifications] = useRecoilState(notificationsState);

    return useCallback((context: ReactNode) => {
        const latestNotification = notifications.at(-1);

        setNotifications(notifications.concat({
            id: latestNotification ? latestNotification.id + 1 : 0,
            type,
            timestamp: Date.now(),
            context,
        }));
    }, [notifications, setNotifications]);
}


export function useAddInformationNotification() {
    return useAddNotification(NotificationType.INFORMATION);
}

export function useAddSuccessNotification() {
    return useAddNotification(NotificationType.SUCCESS);
}

export function useAddWarningNotification() {
    return useAddNotification(NotificationType.WARNING);
}

export function useAddErrorNotification() {
    return useAddNotification(NotificationType.ERROR);
}
