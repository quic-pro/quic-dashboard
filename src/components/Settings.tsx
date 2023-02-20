import {ChangeEvent} from 'react';
import {useRecoilState, useResetRecoilState} from 'recoil';
import {popupNotificationCloseTimeoutState} from 'state/notifications';

import SwitchTheme from './SwitchTheme';
import {InputNumber} from './ui/inputs';


export default function Settings() {
    const [popupNotificationCloseTimeout, setPopupNotificationCloseTimeout] = useRecoilState(popupNotificationCloseTimeoutState);
    const resetPopupNotificationCloseTimeout = useResetRecoilState(popupNotificationCloseTimeoutState);

    const handleResetPopupNotificationCloseTimeout = resetPopupNotificationCloseTimeout;

    const handleChangePopupNotificationCloseTimeout = (event: ChangeEvent<HTMLInputElement>) => {
        setPopupNotificationCloseTimeout(Number(event.target.value));
    };

    return (
        <div className="flex flex-col p-2 bg-white border">
            <div>
                Change Theme: <SwitchTheme/>
            </div>
            <hr className="my-2"/>
            <div>
                <span>PopupNotificationCloseTimeout:</span>
                <div className="flex">
                    <InputNumber
                        placeholder="PopupNotificationCloseTimeout"
                        value={popupNotificationCloseTimeout}
                        onChange={handleChangePopupNotificationCloseTimeout}
                    />
                    <button onClick={handleResetPopupNotificationCloseTimeout} className="ml-2 border rounded-md px-2">Reset</button>
                </div>
            </div>
        </div>
    );
}
