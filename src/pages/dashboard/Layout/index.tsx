import {useEffect} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAccount} from 'wagmi';

import Header from './Header';
import PageContainer from './PageContainer';
import Sidebar from './Sidebar';


export default function Layout() {
    const location = useLocation();
    const navigate = useNavigate();
    const {isConnected} = useAccount();

    useEffect(() => {
        if (!isConnected) {
            navigate('/authorization', {
                state: {
                    redirectTo: location.pathname,
                },
            });
        }
    }, [isConnected, navigate]);

    return (
        <div className="flex-1 flex flex-row">
            <Sidebar className="hidden md:flex"/>
            <div className="flex-1 flex flex-col">
                <Header className="mb-3"/>
                <PageContainer/>
            </div>
        </div>
    );
}
