import {ReactNode, useCallback} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {notificationsState, NotificationType, popupNotificationCloseTimeoutState} from 'state/notifications';


export function useAddNotifications() {
    const [notifications, setNotifications] = useRecoilState(notificationsState);
    const popupNotificationClose = useRecoilValue(popupNotificationCloseTimeoutState);

    const removeNotification = useRemoveNotification();

    return useCallback((type: NotificationType, context: ReactNode) => {
        const id = Date.now();

        setNotifications(notifications.concat({id, type, context}));
        setTimeout(() => removeNotification(id), popupNotificationClose);
    }, [notifications, setNotifications]);
}

export function useAddInformationNotification() {
    const addNotification = useAddNotifications();

    return useCallback((context: ReactNode) => {
        addNotification(NotificationType.INFORMATION, context);
    }, [addNotification]);
}

export function useAddSuccessNotification() {
    const addNotification = useAddNotifications();

    return useCallback((context: ReactNode) => {
        addNotification(NotificationType.SUCCESS, context);
    }, [addNotification]);
}

export function useAddWarningNotification() {
    const addNotification = useAddNotifications();

    return useCallback((context: ReactNode) => {
        addNotification(NotificationType.WARNING, context);
    }, [addNotification]);
}

export function useAddErrorNotification() {
    const addNotification = useAddNotifications();

    return useCallback((context: ReactNode) => {
        addNotification(NotificationType.ERROR, context);
    }, [addNotification]);
}

export function useRemoveNotification() {
    const [notifications, setNotifications] = useRecoilState(notificationsState);

    return useCallback((id: number) => {
        setNotifications(notifications.filter((notificationData) => notificationData.id !== id));
    }, [notifications, setNotifications]);
}
