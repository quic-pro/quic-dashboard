import '@uniswap/widgets/fonts.css';

import {SwapWidget as UniswapSwapWidget, Theme} from '@uniswap/widgets';
import {useAddErrorNotification} from 'hooks/useAddNotification';
import {useRecoilValue} from 'recoil';
import {themeState} from 'state/app';
import {useSigner} from 'wagmi';


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
    const addErrorNotification = useAddErrorNotification();

    const theme = useRecoilValue(themeState);

    const {data} = useSigner();

    return (
        <UniswapSwapWidget
            provider={data?.provider as any}
            onError={(error) => addErrorNotification(error.message)}
            hideConnectionUI={true}
            width="100%"
            theme={theme === 'light' ? LIGHT_THEME : DARK_THEME}
        />
    );
}
