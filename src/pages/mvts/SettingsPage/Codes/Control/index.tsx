import {RootRouter} from '@mvts/contract-interfaces-js';
import {useLayoutEffect, useState} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';

import Loader from '../../../../../components/Loader';
import {notificationListState, NotificationType} from '../../../../../state/app';
import {rootRouterState} from '../../../../../state/dashboard/mvts';
import {getErrorMessage} from '../../../../../utils/getErrorMessage';
import NumberMode from './NumberMode';
import PoolMode from './PoolMode';


type Props = {
    code: number;
};


export default function Control({code}: Props) {
    const [notificationList, setNotificationList] = useRecoilState(notificationListState);
    const rootRouter = useRecoilValue(rootRouterState);

    const [data, setData] = useState<RootRouter.CodeStructOutput | null>(null);

    useLayoutEffect(() => loadData(), [rootRouter, code]);

    const loadData = () => {
        if (!rootRouter) {
            return;
        }

        setData(null);

        rootRouter.getCodeData(code)
            .then(setData)
            .catch((error) => {
                setNotificationList([...notificationList, {
                    type: NotificationType.ERROR,
                    context: `Failed to get code data: ${getErrorMessage(error)}.`,
                }]);
            });
    };

    if (data == null) {
        return <Loader/>;
    }

    return (
        <div className="flex-1 flex flex-col bg-gray-100 rounded-lg p-2">
            {data.mode === 0 ? <NumberMode code={code} data={data}/> : <PoolMode code={code} data={data}/>}
        </div>
    );
}
