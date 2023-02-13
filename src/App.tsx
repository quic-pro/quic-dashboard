import './style.css';

import {StrictMode} from 'react';
import {RecoilRoot} from 'recoil';

import PopupNotificationManager from './components/PopupNotificationManager';
import Web3Provider from './features/web3/components/Web3Provider';
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
