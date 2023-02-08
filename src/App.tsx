import './style.css';

import {StrictMode} from 'react';
import {RecoilRoot} from 'recoil';

import PopupNotification from './components/PopupNotification';
import Web3Provider from './components/Web3Provider';
import {Router} from './pages';


export default function App() {
    return (
        <StrictMode>
            <RecoilRoot>
                <Web3Provider>
                    <Router/>
                    <PopupNotification/>
                </Web3Provider>
            </RecoilRoot>
        </StrictMode>
    );
}
