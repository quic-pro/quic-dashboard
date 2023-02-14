import {ReactNode, useCallback} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {notificationsState, NotificationType, popupNotificationCloseTimeoutState} from 'state/notifications';

import {useRemoveNotification} from './useRemoveNotification';


export function useAddNotification() {
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
    const addNotification = useAddNotification();

    return useCallback((context: ReactNode) => {
        addNotification(NotificationType.INFORMATION, context);
    }, [addNotification]);
}

export function useAddSuccessNotification() {
    const addNotification = useAddNotification();

    return useCallback((context: ReactNode) => {
        addNotification(NotificationType.SUCCESS, context);
    }, [addNotification]);
}

export function useAddWarningNotification() {
    const addNotification = useAddNotification();

    return useCallback((context: ReactNode) => {
        addNotification(NotificationType.WARNING, context);
    }, [addNotification]);
}

export function useAddErrorNotification() {
    const addNotification = useAddNotification();

    return useCallback((context: ReactNode) => {
        addNotification(NotificationType.ERROR, context);
    }, [addNotification]);
}
