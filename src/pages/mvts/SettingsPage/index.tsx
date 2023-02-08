import BasePage from '../BasePage';
import Codes from './Codes';


const TITLE = 'Settings';
const DESCRIPTION = '';


export default function SettingsPage() {
    return (
        <BasePage title={TITLE} description={DESCRIPTION}>
            <div className="my-2">
                <h2 className="text-xl mb-2">Codes:</h2>
                <Codes/>
            </div>
        </BasePage>
    );
}
