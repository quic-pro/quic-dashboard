import React from 'react';
import {Route, Routes} from 'react-router-dom';

import DashboardRouter from './dashboard/Router';


const MainPage = React.lazy(() => import('./MainPage'));
const NotFoundPage = React.lazy(() => import('./NotFoundPage'));


export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/dashboard/*" element={<DashboardRouter/>}/>
            <Route path="/*" element={<NotFoundPage/>}/>
        </Routes>
    );
}
