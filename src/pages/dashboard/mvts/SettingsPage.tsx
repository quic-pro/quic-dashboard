import {AccountCodes, CodeSettings} from 'features/mvts';

import BasePage from './BasePage';


const TITLE = 'Settings';
const DESCRIPTION = '';


export default function SettingsPage() {
    return (
        <BasePage title={TITLE} description={DESCRIPTION}>
            <div className="my-2">
                <h2 className="text-xl mb-2">Codes</h2>
                <AccountCodes details={CodeSettings}/>
            </div>
        </BasePage>
    );
}
