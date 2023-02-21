import {Suspense} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

import Loader from './components/ui/Loader';
import MainRouter from './pages/Router';


export default function Router() {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loader/>}>
                <Routes>
                    <Route path="*" element={<MainRouter/>}/>
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}
