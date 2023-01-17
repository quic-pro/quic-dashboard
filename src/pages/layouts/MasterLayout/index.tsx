import {Outlet} from 'react-router-dom';
import {useAccount} from 'wagmi';

import ConnectWallet from '../../../components/ConnectWallet';
import Header from './Header';
import Sidebar from './Sidebar';


export default function MasterLayout() {
    const {isConnected} = useAccount();

    const style = {
        container: 'flex flex-row w-screen h-screen bg-background',
        connectWallet: 'container max-w-[450px]',
    };

    if (!isConnected) {
        return (
            <div className={style.container.concat('justify-center items-center')}>
                <ConnectWallet className={style.connectWallet}/>
            </div>
        );
    }


    return (
        <div className={style.container}>
            <Sidebar/>
            <main className="flex flex-col h-full w-full">
                <Header className="mb-3"/>
                <Outlet/>
            </main>
        </div>
    );
}
