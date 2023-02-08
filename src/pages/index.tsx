import React, {Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Loader from '../components/Loader';
import DashboardLayout from './layouts/DashboardLayout';


const NotFoundPage = React.lazy(() => import('./NotFoundPage'));

const MainPage = React.lazy(() => import('./MainPage'));
const DashboardPage = React.lazy(() => import('./DashboardPage'));
const MessengerPage = React.lazy(() => import('./MessengerPage'));

const MvtsLayout = React.lazy(() => import('./mvts/Layout'));
const MvtsMainPage = React.lazy(() => import('./mvts/MainPage'));
const MvtsShopPage = React.lazy(() => import('./mvts/ShopPage'));
const MvtsMarketplacePage = React.lazy(() => import('./mvts/MarketplacePage'));
const MvtsAccountPage = React.lazy(() => import('./mvts/AccountPage'));
const MvtsSettingPage = React.lazy(() => import('./mvts/SettingsPage'));

const FinanceSwapPage = React.lazy(() => import('./finance/SwapPage'));
const FinanceTransactionsPage = React.lazy(() => import('./finance/TransactionsPage'));


export function Router() {
    return (
        <Suspense fallback={<Loader/>}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route element={<DashboardLayout/>}>
                        <Route path="/dashboard" element={<DashboardPage/>}/>
                        <Route path="/dashboard/messenger" element={<MessengerPage/>}/>

                        <Route element={<MvtsLayout/>}>
                            <Route path="/dashboard/mvts" element={<MvtsMainPage/>}/>
                            <Route path="/dashboard/mvts/shop" element={<MvtsShopPage/>}/>
                            <Route path="/dashboard/mvts/marketplace" element={<MvtsMarketplacePage/>}/>
                            <Route path="/dashboard/mvts/account" element={<MvtsAccountPage/>}/>
                            <Route path="/dashboard/mvts/settings" element={<MvtsSettingPage/>}/>
                        </Route>

                        <Route path="/dashboard/finance/swap" element={<FinanceSwapPage/>}/>
                        <Route path="/dashboard/finance/transactions" element={<FinanceTransactionsPage/>}/>
                    </Route>

                    <Route path="*" element={<NotFoundPage/>}/>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}
