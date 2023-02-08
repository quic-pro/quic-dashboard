import {ReactNode, useCallback} from 'react';
import {useRecoilState} from 'recoil';

import {NotificationData, notificationListState, NotificationType} from '../state/app';


export function useAddNotification() {
    const [notificationList, setNotificationList] = useRecoilState(notificationListState);

    return useCallback((type: NotificationType, context: ReactNode) => {
        setNotificationList(notificationList.concat({type, context}));
    }, [notificationList, setNotificationList]);
}

export function useRemoveNotification() {
    const [notificationList, setNotificationList] = useRecoilState(notificationListState);

    return useCallback((removedNotificationData: NotificationData) => {
        setNotificationList(notificationList.filter((notificationData) => notificationData !== removedNotificationData));
    }, [notificationList, setNotificationList]);
}
