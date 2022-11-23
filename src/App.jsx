import React, {lazy, useEffect} from 'react';
import {
    Routes,
    Route,
    useLocation
} from 'react-router-dom';

import './css/style.css';

import './charts/ChartjsConfig';

// Import pages

import {useWeb3React} from "@web3-react/core";
import WalletConnect from "./components/WalletConnection";
import MasterLayout from "./pages/layouts/MasterLayout";

const MainPage = lazy(() => import('./pages/MainPage'));
const SwapPage = lazy(() => import('./pages/SwapPage'));
const BuyPage = lazy(() => import('./pages/BuyPage'));
const NumberManagementPage = lazy(() => import('./pages/NumberManagementPage'));

import {initializeContracts} from './contracts';


function App() {
    const {account, ENSName, provider} = useWeb3React();

    const location = useLocation();

    useEffect(() => {
        if (provider) {
            initializeContracts(provider.getSigner())
                .catch(console.error);
        }
    }, [provider])


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
                    <Route element={<MasterLayout/>}>
                        <Route exact path="/" element={<MainPage/>}/>
                        <Route exact path="/swap" element={<SwapPage/>}/>
                        <Route exact path="/buy" element={<BuyPage/>}/>
                        <Route exact path="/number-management" element={<NumberManagementPage/>}/>
                    </Route>
                </Routes>
            </>
        );
    }
}

export default App;
