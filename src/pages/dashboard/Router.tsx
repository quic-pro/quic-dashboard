import React from 'react';
import {Route, Routes} from 'react-router-dom';

import FinanceRouter from './finance/Router';
import Layout from './Layout';
import MvtsRouter from './mvts/Router';


const MainPage = React.lazy(() => import('./MainPage'));
const MessengerPage = React.lazy(() => import('./MessengerPage'));
const NotFoundPage = React.lazy(() => import('./NotFoundPage'));


export default function Router() {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/messenger" element={<MessengerPage/>}/>
                <Route path="/finance/*" element={<FinanceRouter/>}/>
                <Route path="/mvts/*" element={<MvtsRouter/>}/>
                <Route path="/*" element={<NotFoundPage/>}/>
            </Route>
        </Routes>
    );
}
