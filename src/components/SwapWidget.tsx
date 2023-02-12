import '@uniswap/widgets/fonts.css';

import {SwapWidget as UniswapSwapWidget, Theme} from '@uniswap/widgets';
import {useRecoilValue} from 'recoil';
import {useSigner} from 'wagmi';

import {useAddNotification} from '../hooks/notification';
import {NotificationType, themeState} from '../state/app';


const DARK_THEME: Theme = {
    primary: '#09a2ff',
    secondary: '#6bbff1',
    interactive: '#f1f7fc',
    container: '#f1f7fc',
    module: '#fff',
    accent: '#3b99e0',
    outline: '#3b99e0',
    dialog: '#f1f7fc',
};

const LIGHT_THEME: Theme = {
    primary: '#09a2ff',
    secondary: '#6bbff1',
    interactive: '#f1f7fc',
    container: '#f1f7fc',
    module: '#fff',
    accent: '#3b99e0',
    outline: '#3b99e0',
    dialog: '#f1f7fc',
};


export default function SwapWidget() {
    const addNotification = useAddNotification();

    const theme = useRecoilValue(themeState);

    const {data} = useSigner();

    return (
        <UniswapSwapWidget
            provider={data?.provider as any}
            onError={(error) => addNotification(NotificationType.ERROR, error.message)}
            hideConnectionUI={true}
            width="100%"
            theme={theme === 'light' ? LIGHT_THEME : DARK_THEME}
        />
    );
}
