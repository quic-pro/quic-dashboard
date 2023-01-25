import {useLayoutEffect} from 'react';
import {useRecoilState} from 'recoil';

import {NotificationData, notificationListState} from '../../state/app';
import Notification from './Notification';


export default function PopupNotification() {
    const [notificationList, setNotificationList] = useRecoilState(notificationListState);

    const close = (data: NotificationData) => {
        setNotificationList(notificationList.filter((notificationData) => notificationData !== data));
    };

    let timeout: NodeJS.Timeout | null = null;
    useLayoutEffect(() => {
        if (notificationList.length) {
            if (timeout) {
                clearTimeout(timeout);
            }
            timeout = setTimeout(() => close(notificationList[0]), 3000);
        }

        return () => {
            if (timeout) {
                clearTimeout(timeout);
            }
        };
    }, [notificationList]);

    return (
        <div className="fixed flex-col bottom-0 right-0">
            {notificationList.map((notificationData, index) => <Notification key={index} data={notificationData} close={close}/>)}
        </div>
    );
}
