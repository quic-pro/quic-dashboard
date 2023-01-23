import {MENU} from '../../../../../constants/dashboard/sidebar';
import MenuSection from './MenuSection';


type Props = {
    isSidebarExpanded: boolean;
};


export default function Menu({isSidebarExpanded}: Props) {
    return (
        <nav className="flex flex-col">
            {MENU.map((menuSection) => <MenuSection key={menuSection.name} data={menuSection} isSidebarExpanded={isSidebarExpanded}/>)}
        </nav>
    );
}
