import {useRecoilValue, useResetRecoilState} from 'recoil';
import {notificationsState} from 'state/notifications';

import PopupNotification from './PopupNotification';


export default function PopupNotificationManager() {
    const notifications = useRecoilValue(notificationsState);
    const resetNotifications = useResetRecoilState(notificationsState);

    const handleClosingAll = () => {
        resetNotifications();
    };

    return (
        <div className="fixed flex-col bottom-0 right-0">
            {notifications.length > 1 && <button onClick={handleClosingAll}>Close all</button>}
            {notifications.map((notificationData) => <PopupNotification key={notificationData.id} data={notificationData}/>)}
        </div>
    );
}
