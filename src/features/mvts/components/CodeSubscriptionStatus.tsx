import {CodeStatus} from '@mvts/contract-interfaces-js';
import Loader from 'components/ui/Loader';
import {HiOutlineRefresh} from 'react-icons/hi';
import {roundBigNumber} from 'utils/bigNumber';
import {useNetwork} from 'wagmi';

import {useCodeData, useSubscriptionPrice} from '../hooks/useRootRouterData';
import {useRenewSubscription} from '../hooks/useRootRouterTransaction';
import {getCodeStatus} from '../utils/сodeStatus';


type Props = {
    code: number;
};


export default function CodeSubscriptionStatus({code}: Props) {
    const renewSubscription = useRenewSubscription();

    const {chain} = useNetwork();

    const codeData = useCodeData(code);
    const subscriptionPrice = useSubscriptionPrice();
    if ((codeData.data == null) || (subscriptionPrice.data == null)) {
        return <Loader/>;
    }

    const handleRefresh = () => {
        codeData.refresh();
    };

    const handleRenewSubscription = () => {
        if (!subscriptionPrice.data) {
            return;
        }

        renewSubscription(code, {value: subscriptionPrice.data});
    };

    return (
        <div className="flex-1 flex flex-col bg-quicBlueL dark:bg-quicBlueD rounded-lg p-2 mt-2">
            <button
                onClick={handleRefresh}
                className="border rounded-md p-1 m-1
                        bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                        dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
            >
                <HiOutlineRefresh/>
            </button>
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
                <button
                    onClick={handleRenewSubscription}
                    className="border rounded-md mr-5 px-1 mt-10
                        bg-quicBlueL-400 hover:bg-white text-white border-quicBlueL-400 hover:text-quicBlueL-400
                        dark:bg-quicBlueD-400 dark:hover:bg-white dark:text-white dark:hover:text-quicBlueD-400 dark:border-quicBlueD-400"
                >
                    Renew subscription
                </button>
                {subscriptionPrice.data && (
                    <>
                        <span className="mr-1">{roundBigNumber(subscriptionPrice.data, 4)}</span>
                        <span>{chain?.nativeCurrency.symbol}</span>
                    </>
                )}
            </div>
        </div>
    );
}
