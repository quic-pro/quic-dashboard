import React from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import {MasterLayout} from './layouts';


const MainPage = React.lazy(() => import('./MainPage'));


export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MasterLayout/>}>
                    <Route path="/" element={<MainPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
