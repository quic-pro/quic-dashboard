import {useResetRootRouter, useUpdateRootRouter} from 'features/mvts';
import {useEffect, useState} from 'react';
import {Outlet} from 'react-router-dom';

import {useAddErrorNotification} from '../../../../hooks/useAddNotification';
import {getErrorMessage} from '../../../../utils/error';
import MessageAboutSectionPreparation from './MessageAboutSectionPreparation';


export default function Layout() {
    const [isPrepared, setIsPrepared] = useState(false);

    const addErrorNotification = useAddErrorNotification();

    const resetRootRouter = useResetRootRouter();
    const updateRootRouter = useUpdateRootRouter({
        onError: (error) => addErrorNotification(`Failed to get root router: ${getErrorMessage(error)}`),
        onSuccess: () => setIsPrepared(true),
    });

    useEffect(() => {
        updateRootRouter(true);
        return resetRootRouter;
    }, [updateRootRouter, resetRootRouter]);

    return isPrepared ? <Outlet/> : <MessageAboutSectionPreparation/>;
}
