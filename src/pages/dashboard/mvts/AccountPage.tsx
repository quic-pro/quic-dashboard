import {AccountCodes, CodeSubscriptionStatus} from 'features/mvts';

import BasePage from './BasePage';


const TITLE = 'Account';
const DESCRIPTION = '';


export default function AccountPage() {
    return (
        <BasePage title={TITLE} description={DESCRIPTION}>
            <div className="my-2">
                <h2 className="text-xl mb-2">Your codes:</h2>
                <AccountCodes details={CodeSubscriptionStatus}/>
            </div>
            <div className="my-2">
                <h2 className="text-xl mb-2">Slots on the marketplace:</h2>
                <span>Coming soon...</span>
            </div>
        </BasePage>
    );
}
