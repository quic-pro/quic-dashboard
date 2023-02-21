import React from 'react';
import {Route, Routes} from 'react-router-dom';


const Layout = React.lazy(() => import('./Layout'));
const MainPage = React.lazy(() => import('./MainPage'));
const ShopPage = React.lazy(() => import('./ShopPage'));
const MarketplacePage = React.lazy(() => import('./MarketplacePage'));
const AccountPage = React.lazy(() => import('./AccountPage'));
const SettingPage = React.lazy(() => import('./SettingsPage'));
const NotFoundPage = React.lazy(() => import('../NotFoundPage'));


export default function Router() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/shop" element={<ShopPage/>}/>
                <Route path="/marketplace" element={<MarketplacePage/>}/>
                <Route path="/account" element={<AccountPage/>}/>
                <Route path="/settings" element={<SettingPage/>}/>
            </Route>
            <Route path="/*" element={<NotFoundPage/>}/>
        </Routes>
    );
}
