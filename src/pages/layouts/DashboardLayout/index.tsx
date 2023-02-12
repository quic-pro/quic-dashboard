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
            <Sidebar className="hidden md:flex"/>
            <div className="flex-1 flex flex-col">
                <Header className="mb-3"/>
                <main className="flex-1 flex flex-col overflow-auto">
                    <div className="container flex-1 flex flex-col">
                        <Suspense fallback={<Loader/>}>
                            <Outlet/>
                        </Suspense>
                    </div>
                </main>
            </div>
        </div>
    );
}
