import {atom} from 'recoil';

import {isMobileOrTable} from '../../utils/userAgent';


export const sidebarModeState = atom<'expanded' | 'collapsed'>({
    key: 'sidebarMode',
    default: isMobileOrTable ? 'collapsed' : 'expanded',
});
