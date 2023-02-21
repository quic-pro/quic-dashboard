import {atom} from 'recoil';
import {getTheme} from 'utils/theme';


export const themeState = atom<'light' | 'dark'>({
    key: 'theme',
    default: getTheme(),
});
