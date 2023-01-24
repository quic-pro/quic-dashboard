import {useRecoilState} from 'recoil';

import {notificationListState} from '../../state/app';
import Notification from './Notification';


export default function PopupNotification() {
    const [notificationList, setNotificationList] = useRecoilState(notificationListState);

    const close = (deletedIndex: number) => {
        setNotificationList(notificationList.filter((_notificationData, index) => index !== deletedIndex));
    };

    return (
        <div className="fixed flex-col bottom-0 right-0">
            {notificationList.map(({type, context}, index) => <Notification key={index} type={type} context={context} close={() => close(index)}/>)}
        </div>
    );
}
