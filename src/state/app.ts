import {ReactNode} from 'react';
import {atom} from 'recoil';

import {getTheme} from '../utils/theme';


export type NotificationData = {
    type: NotificationType;
    context: ReactNode;
};

export enum NotificationType {
    INFORMATION,
    SUCCESS,
    WARNING,
    ERROR,
}


export const themeState = atom<'light' | 'dark'>({
    key: 'theme',
    default: getTheme(),
});

export const notificationListState = atom<NotificationData[]>({
    key: 'notificationList',
    default: [],
});
