import {useNetwork} from 'wagmi';

import Loader from '../../../../components/Loader';
import {useCodeStatus, useRenewSubscription, useSubscriptionPrice} from '../../../../hooks/mvts/rootRouter';
import {roundBigNumber} from '../../../../utils/bigNumber';


type Props = {
    code: number;
};


export default function Status({code}: Props) {
    const codeStatus = useCodeStatus(code);
    const subscriptionPrice = useSubscriptionPrice();

    const renewSubscription = useRenewSubscription();

    const {chain} = useNetwork();

    const handleRenewSubscription = () => {
        if (!subscriptionPrice.data) {
            return;
        }

        renewSubscription(code, {value: subscriptionPrice.data});
    };

    if (codeStatus.data == null) {
        return <Loader/>;
    }

    return (
        <div className="flex-1 flex flex-col bg-quicBlueL dark:bg-quicBlueD rounded-lg p-2 mt-2">
            <div>
                <span className="mr-2">Lock status:</span>
                <span>{codeStatus.data.isBlocked ? 'Is blocked' : 'Not blocked'}</span>
            </div>
            <div>
                <span className="mr-2">Hold status:</span>
                <span>{codeStatus.data.isHeld ? 'Is held' : 'Not held'}</span>
                {codeStatus.data.isHeld && <span>Renew your subscription</span>}
            </div>
            <div>
                <span className="mr-2">Expired:</span>
                {codeStatus.data.isHeld
                    ? <span>{new Date(codeStatus.data.holdEndTime.toNumber() * 1000).toUTCString()}</span>
                    : <span>{new Date(codeStatus.data.subscriptionEndTime.toNumber() * 1000).toUTCString()}</span>}
            </div>
            <div>
                <button onClick={handleRenewSubscription}
                    className="border rounded-md mr-5 px-1 mt-10
                    bg-quicBlueL-400 hover:bg-white text-white border-quicBlueL-400 hover:text-quicBlueL-400
                    dark:bg-quicBlueD-400 dark:hover:bg-white dark:text-white
                    dark:hover:text-quicBlueD-400 dark:border-quicBlueD-400"
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
