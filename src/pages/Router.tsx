import React from 'react';
import {Route, Routes} from 'react-router-dom';

import DashboardRouter from './dashboard/Router';
import Layout from './Layout';


const MainPage = React.lazy(() => import('./MainPage'));
const MvtsDemoPage = React.lazy(() => import('./MvtsDemoPage'));
const NotFoundPage = React.lazy(() => import('./NotFoundPage'));


export default function Router() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/mvts-demo" element={<MvtsDemoPage/>}/>
            </Route>
            <Route path="/dashboard/*" element={<DashboardRouter/>}/>
            <Route path="/*" element={<NotFoundPage/>}/>
        </Routes>
    );
}
