import Loader from 'components/ui/Loader';
import {Suspense} from 'react';
import {Outlet} from 'react-router-dom';


export default function PageContainer() {
    return (
        <main className="flex-1 flex flex-col overflow-auto">
            <div className="flex-1 flex flex-col">
                <Suspense fallback={<Loader/>}>
                    <Outlet/>
                </Suspense>
            </div>
        </main>
    );
}
