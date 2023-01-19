import React, {Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Loader from '../components/Loader';
import DashboardLayout from './layouts/DashboardLayout';


const MainPage = React.lazy(() => import('./MainPage'));
const DashboardPage = React.lazy(() => import('./DashboardPage'));


export function Router() {
    return (
        <Suspense fallback={<Loader/>}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route element={<DashboardLayout/>}>
                        <Route path="/dashboard" element={<DashboardPage/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Suspense>
    );
}
