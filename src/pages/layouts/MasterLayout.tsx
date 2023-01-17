import {Outlet} from 'react-router-dom';
import {useAccount, useDisconnect} from 'wagmi';

import ConnectWallet from '../../components/ConnectWallet';


export default function MasterLayout() {
    const {isConnected} = useAccount();

    return (!isConnected ? <Authorization/> : <Content/>);
}

function Authorization() {
    const style = {
        container: 'flex w-screen h-screen justify-center items-center bg-background',
        connectWallet: 'container max-w-[450px]',
    };

    return (
        <div className={style.container}>
            <ConnectWallet className={style.connectWallet}/>
        </div>
    );
}

function Content() {
    const {disconnect} = useDisconnect();

    return (
        <>
            <Outlet/>
            <ConnectWallet className="w-[400px]"/>
            <button onClick={() => disconnect()}>Disconnect</button>
        </>
    );
}
