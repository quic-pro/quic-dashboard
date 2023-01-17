import './style.css';

import {StrictMode} from 'react';

import Web3Provider from './components/Web3Provider';
import Router from './pages';


export default function App() {
    return (
        <StrictMode>
            <Web3Provider>
                <Router/>
            </Web3Provider>
        </StrictMode>
    );
}
