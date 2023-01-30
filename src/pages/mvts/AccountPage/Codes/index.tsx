import {useLayoutEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import {useAccount} from 'wagmi';

import Loader from '../../../../components/Loader';
import {notificationListState, NotificationType} from '../../../../state/app';
import {rootRouterState} from '../../../../state/dashboard/mvts';
import {getErrorMessage} from '../../../../utils/getErrorMessage';
import Status from './Status';


export default function Codes() {
    const [notificationList, setNotificationList] = useRecoilState(notificationListState);
    const rootRouter = useRecoilValue(rootRouterState);

    const [codes, setCodes] = useState<number[] | null>(null);
    const [selectedCode, setSelectedCode] = useState<number | null>(null);

    const {address} = useAccount();

    useLayoutEffect(() => loadData(), [rootRouter]);

    const loadData = () => {
        if (!rootRouter || !address) {
            return;
        }

        setCodes(null);

        rootRouter.getOwnerCodes(address)
            .then((ownerCodes) => {
                const codes: number[] = [];
                ownerCodes.forEach((ownedByAccount, index) => ownedByAccount && codes.push(index));
                setCodes(codes);
            })
            .catch((error) => {
                setNotificationList([...notificationList, {
                    type: NotificationType.ERROR,
                    context: `Failed to get account codes: ${getErrorMessage(error)}.`,
                }]);
            });
    };

    const handleCodeSelection = (code: number) => {
        setSelectedCode(code === selectedCode ? null : code);
    };

    if (codes == null) {
        return <Loader/>;
    }

    return (
        <div>
            <div className="flex flex-wrap">
                {codes.map((code) => (
                    <button
                        key={code}
                        onClick={() => handleCodeSelection(code)}
                        className="border rounded-md p-1 m-1 w-[42px] h-[34px]
                            bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                            dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
                    >
                        {code}
                    </button>
                ))}
                <button
                    onClick={loadData}
                    className="border rounded-md p-1 m-1 bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                        dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
                >
                    Refresh
                </button>
            </div>
            {selectedCode && <Status code={selectedCode}/>}
        </div>
    );
}
