import {MENU} from '../../../../../constants/dashboard/sidebar';
import MenuSection from './MenuSection';


export default function Menu() {
    return (
        <nav className="flex flex-col">
            {MENU.map((menuSection) => <MenuSection key={menuSection.name} data={menuSection}/>)}
        </nav>
    );
}
