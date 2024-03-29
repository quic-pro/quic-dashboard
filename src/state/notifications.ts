import {localStorageEffect} from 'lib/recoil/effects';
import {ReactNode} from 'react';
import {atom} from 'recoil';


export type NotificationData = {
    id: number;
    timestamp: number;
    type: NotificationType;
    context: ReactNode;
};


export enum NotificationType {
    INFORMATION,
    SUCCESS,
    WARNING,
    ERROR,
}


export const notificationsState = atom<NotificationData[]>({
    key: 'notifications',
    default: [],
});

export const popupNotificationCloseTimeoutState = atom<number>({
    key: 'popupNotificationCloseTimeout',
    default: 5000,
    effects: [
        localStorageEffect('popupNotificationCloseTimeout'),
    ],
});
