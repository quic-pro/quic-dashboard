import './style.css';

import {Web3Provider} from 'features/web3';
import {StrictMode} from 'react';
import {RecoilRoot} from 'recoil';

import PopupNotificationManager from './components/PopupNotificationManager';
import Router from './Router';


export default function App() {
    return (
        <StrictMode>
            <RecoilRoot>
                <Web3Provider>
                    <Router/>
                    <PopupNotificationManager/>
                </Web3Provider>
            </RecoilRoot>
        </StrictMode>
    );
}
