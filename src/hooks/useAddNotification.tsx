import {ReactNode, useCallback} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {notificationsState, NotificationType, popupNotificationCloseTimeoutState} from 'state/notifications';

import {useRemoveNotification} from './useRemoveNotification';


function useAddNotification(type: NotificationType) {
    const [notifications, setNotifications] = useRecoilState(notificationsState);
    const popupNotificationCloseTimeout = useRecoilValue(popupNotificationCloseTimeoutState);

    const removeNotification = useRemoveNotification();

    return useCallback((context: ReactNode) => {
        const id = Date.now();

        setNotifications(notifications.concat({id, type, context}));
        setTimeout(() => removeNotification(id), popupNotificationCloseTimeout);
    }, [notifications, setNotifications, popupNotificationCloseTimeout]);
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
