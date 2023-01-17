import {Outlet} from 'react-router-dom';
import {useAccount, useDisconnect} from 'wagmi';

import ConnectWallet from '../../components/ConnectWallet';


export default function MasterLayout() {
    const {isConnected} = useAccount();

    return (!isConnected ? <Authorization/> : <Content/>);
}

function Authorization() {
    return (
        <ConnectWallet/>
    );
}

function Content() {
    const {disconnect} = useDisconnect();

    return (
        <>
            <Outlet/>
            <button onClick={() => disconnect()}>Disconnect</button>
        </>
    );
}
