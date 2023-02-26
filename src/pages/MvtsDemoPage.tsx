import {CodeStatus, ROOT_ROUTER_POOL_SIZE} from '@mvts/contract-interfaces-js';
import Loader from 'components/ui/Loader';
import {useResetRootRouter, useUpdateRootRouter} from 'features/mvts';
import {useCodeStatuses} from 'features/mvts/hooks/useRootRouterData';
import {useAddErrorNotification} from 'hooks/useAddNotification';
import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import {getErrorMessage} from 'utils/error';


export default function MvtsDemoPage() {
    const [isPrepared, setIsPrepared] = useState(false);
    const addErrorNotification = useAddErrorNotification();

    const resetRootRouter = useResetRootRouter();
    const updateRootRouter = useUpdateRootRouter({
        onError: (error) => addErrorNotification(`Failed to get root router: ${getErrorMessage(error)}`),
        onSuccess: () => setIsPrepared(true),
    });

    useEffect(() => {
        updateRootRouter();
        return resetRootRouter;
    }, [updateRootRouter, resetRootRouter]);

    return (
        <div className="flex flex-col items-center text-center p-2">
            <h1 className="text-4xl mt-4">MVTS</h1>
            <h2 className="text-2xl italic">MetaVerse Telecom Service</h2>
            <h4 className="text-lg mt-4 border rounded-2xl p-2 bg-quicBlueL-200">Voip blockchain protocol: calls and messages between blockchain wallets.</h4>
            <span className="text-lg mt-4">You can buy a short number or create your own pool of numbers to sell.</span>
            {isPrepared ? <CodeTable/> : <Loader/>}
        </div>
    );
}

function CodeTable() {
    const codeStatuses = useCodeStatuses();
    if (codeStatuses.data === null) {
        return <Loader/>;
    }

    return (
        <>
            <span className="text-lg">Available {codeStatuses.data.filter((status) => status === CodeStatus.AvailableForMinting).length} of {ROOT_ROUTER_POOL_SIZE}:</span>
            <div className="flex flex-wrap justify-center w-full md:w-4/5 lg:w-3/4 xl:w-3/5 2xl:w-1/2">
                {codeStatuses.data.map((status, code) => {
                    if (status !== CodeStatus.AvailableForMinting) {
                        return null;
                    }

                    return (
                        <Link key={code} to="/dashboard/mvts/shop" className="border rounded-md py-1 m-1 w-16 bg-green-300">
                            {code}
                        </Link>
                    );
                })}
            </div>
        </>
    );
}
