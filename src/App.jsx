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
import DashboardPage from './pages/Dashboard';
import MainPage from './pages/Main';
import {useWeb3React} from "@web3-react/core";

function App() {
    const {account, ENSName} = useWeb3React();

    const location = useLocation();

    useEffect(() => {
        document.querySelector('html').style.scrollBehavior = 'auto'
        window.scroll({top: 0})
        document.querySelector('html').style.scrollBehavior = ''
    }, [location.pathname]); // triggered on route change

    if ((!account && !ENSName)) {
        return (
            <>
                <Routes>
                    <Route exact path="*" element={<MainPage/>}/>
                </Routes>
            </>
        );
    } else {
        return (
            <>
                <Routes>
                    <Route exact path="/" element={<MainPage/>}/>
                    <Route exact path="/dashboard" element={<DashboardPage/>}/>
                </Routes>
            </>
        );
    }
}

export default App;
