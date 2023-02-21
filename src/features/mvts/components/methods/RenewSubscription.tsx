import {useSubscriptionPrice} from '../../hooks/useRootRouterData';
import {useRenewSubscription} from '../../hooks/useRootRouterTransaction';
import Base from './Base';


type Props = {
    code: number;
};


export default function RenewSubscription({code}: Props) {
    const renewSubscription = useRenewSubscription();
    const subscriptionPrice = useSubscriptionPrice();

    const method = (code: number) => renewSubscription(code, {value: subscriptionPrice.data!});

    return <Base name="Renew Subscription" code={code} method={method} disabled={!subscriptionPrice.data}/>;
}
