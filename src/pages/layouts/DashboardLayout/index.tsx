import {Suspense, useEffect} from 'react';
import {Outlet, useNavigate} from 'react-router-dom';
import {useAccount} from 'wagmi';

import Loader from '../../../components/Loader';
import Header from './Header';
import Sidebar from './Sidebar';


export default function DashboardLayout() {
    const navigate = useNavigate();
    const {isConnected} = useAccount();

    useEffect(() => {
        if (!isConnected) {
            navigate('/');
        }
    }, [isConnected, navigate]);

    return (
        <div className="flex-1 flex flex-row">
            <Sidebar/>
            <main className="flex-1 flex flex-col">
                <Header className="mb-3"/>
                <Suspense fallback={<Loader/>}>
                    <Outlet/>
                </Suspense>
            </main>
        </div>
    );
}
