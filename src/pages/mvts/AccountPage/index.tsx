import BasePage from '../BasePage';
import Codes from './Codes';


const TITLE = 'ACCOUNT';
const DESCRIPTION = '';


export default function AccountPage() {
    return (
        <BasePage title={TITLE} description={DESCRIPTION}>
            <div className="my-2">
                <h2 className="text-xl">Codes:</h2>
                <Codes/>
            </div>
            <div className="my-2">
                <h2 className="text-xl">Slots on the marketplace:</h2>
                <span>Coming soon...</span>
            </div>
        </BasePage>
    );
}
