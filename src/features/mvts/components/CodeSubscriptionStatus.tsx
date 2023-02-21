import {CodeStatus} from '@mvts/contract-interfaces-js';
import Loader from 'components/ui/Loader';
import {HiOutlineRefresh} from 'react-icons/hi';

import {useCodeData, useSubscriptionPrice} from '../hooks/useRootRouterData';
import {getCodeStatus} from '../utils/сodeStatus';
import {RenewSubscription} from './methods';


type Props = {
    code: number;
};


const METHODS = [RenewSubscription];


export default function CodeSubscriptionStatus({code}: Props) {
    const codeData = useCodeData(code);
    const subscriptionPrice = useSubscriptionPrice();
    if ((codeData.data == null) || (subscriptionPrice.data == null)) {
        return <Loader/>;
    }

    const handleRefresh = () => {
        codeData.refresh();
    };

    return (
        <div className="flex-1 flex flex-col bg-quicBlueL dark:bg-quicBlueD rounded-lg p-2">
            <div className="mb-2">
                <button
                    onClick={handleRefresh}
                    className="flex border rounded-md px-2 py-1 h-8 items-center
                        bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                        dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
                >
                    <HiOutlineRefresh className="mr-1"/>
                    Refresh
                </button>
            </div>
            <div>
                <span>Status: {getCodeStatus(codeData.data.status)}</span>
                {codeData.data.status === CodeStatus.Held && <span>Renew your subscription</span>}
            </div>
            <div>
                <span className="mr-2">Expired:</span>
                {codeData.data.status === CodeStatus.Held
                    ? <span>{new Date(codeData.data.holdEndTime.toNumber() * 1000).toUTCString()}</span>
                    : <span>{new Date(codeData.data.subscriptionEndTime.toNumber() * 1000).toUTCString()}</span>}
            </div>
            <div>
                <hr className="my-6"/>
                {METHODS.map((Method) => (
                    <div key={Method.name}>
                        <Method code={code}/>
                        <hr className="my-6"/>
                    </div>
                ))}
            </div>
        </div>
    );
}
