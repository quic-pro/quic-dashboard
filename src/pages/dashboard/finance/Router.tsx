import React from 'react';
import {Route, Routes} from 'react-router-dom';


const SwapPage = React.lazy(() => import('./SwapPage'));
const TransactionsPage = React.lazy(() => import('./TransactionsPage'));
const NotFoundPage = React.lazy(() => import('../NotFoundPage'));


export default function Router() {
    return (
        <Routes>
            <Route path="/swap" element={<SwapPage/>}/>
            <Route path="/transactions" element={<TransactionsPage/>}/>
            <Route path="/*" element={<NotFoundPage/>}/>
        </Routes>
    );
}
