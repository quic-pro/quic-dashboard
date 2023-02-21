import {MENU} from 'constants/dashboard/sidebar';
import {useRecoilValue} from 'recoil';
import {sidebarModeState} from 'state/dashboard';

import MenuSection from './MenuSection';


export default function Menu() {
    const sidebarMode = useRecoilValue(sidebarModeState);

    return (
        <nav className="flex flex-col">
            {sidebarMode === 'expanded' && <span className="font-bold text-quicBlackL-200 dark:text-quicBlackD-200">MENU</span>}
            {MENU.map((menuSection) => <MenuSection key={menuSection.name} data={menuSection}/>)}
        </nav>
    );
}
