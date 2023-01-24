import {ReactNode} from 'react';
import {atom} from 'recoil';


export type NotificationData = {
    type: NotificationType;
    context: ReactNode
};

export enum NotificationType {
    INFORMATION,
    SUCCESS,
    WARNING,
    ERROR
}


export const notificationListState = atom<NotificationData[]>({
    key: 'notificationList',
    default: [
        {
            type: NotificationType.INFORMATION,
            context: 'text',
        },
        {
            type: NotificationType.SUCCESS,
            context: 'text',
        },
        {
            type: NotificationType.ERROR,
            context: 'text',
        },
        {
            type: NotificationType.WARNING,
            context: 'text',
        },
    ],
});
