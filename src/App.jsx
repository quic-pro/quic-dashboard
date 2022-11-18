import React, {useEffect} from 'react';
import {
    Routes,
    Route,
    Navigate,
    useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages
import MainPage from './pages/MainPage';
import SwapPage from './pages/SwapPage';
import {useWeb3React} from "@web3-react/core";
import WalletConnect from "./components/WalletConnection";

function App() {
    const {account, ENSName} = useWeb3React();

    const location = useLocation();

    useEffect(() => {
        document.querySelector('html').style.scrollBehavior = 'auto'
        window.scroll({top: 0})
        document.querySelector('html').style.scrollBehavior = ''
    }, [location.pathname]); // triggered on route change

    if ((!account && !ENSName)) {
        return <WalletConnect/>;
    } else {
        return (
            <>
                <Routes>
                    <Route exact path="/" element={<MainPage/>}/>
                    <Route exact path="/swap" element={<SwapPage/>}/>
                </Routes>
            </>
        );
    }
}

export default App;
