import {useRecoilValue} from 'recoil';
import {notificationsState} from 'state/notifications';

import PopupNotification from './PopupNotification';


export default function PopupNotificationManager() {
    const notifications = useRecoilValue(notificationsState);

    return (
        <div className="fixed flex-col bottom-0 right-0">
            {notifications.map((notificationData) => <PopupNotification key={notificationData.id} data={notificationData}/>)}
        </div>
    );
}
