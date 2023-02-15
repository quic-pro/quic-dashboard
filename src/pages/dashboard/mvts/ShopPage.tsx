import {CodeInfo, PoolCodes} from 'features/mvts';

import BasePage from './BasePage';


const TITLE = 'Shop';
const DESCRIPTION = 'On this page, you can buy a code in the root router and then on the Settings page configure it.';


export default function ShopPage() {
    return (
        <BasePage title={TITLE} description={DESCRIPTION}>
            <PoolCodes details={CodeInfo}/>
        </BasePage>
    );
}
