import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';

import Loader from '../../../components/ui/Loader';


export default function PageContainer() {
    return (
        <main className="flex-1 flex flex-col overflow-auto">
            <div className="container flex-1 flex flex-col">
                <Suspense fallback={<Loader/>}>
                    <Outlet/>
                </Suspense>
            </div>
        </main>
    );
}
