import {useRecoilValue} from 'recoil';

import {MENU} from '../../../../../constants/dashboard/sidebar';
import {sidebarModeState} from '../../../../../state/dashboard/layout';
import MenuSection from './MenuSection';


export default function Menu() {
    const sidebarMode = useRecoilValue(sidebarModeState);

    return (
        <nav className="flex flex-col">
            {sidebarMode === 'expanded' && <span className='font-bold text-quicBlackL-200 dark:text-quicBlackD-200'>MENU</span>}
            {MENU.map((menuSection) => <MenuSection key={menuSection.name} data={menuSection}/>)}
        </nav>
    );
}
