import {useAccount, useDisconnect} from 'wagmi';

import {collapseAddress} from '../utils/wallet';
import SwitchTheme from './SwitchTheme';


export default function AccountInfo() {
    const {address} = useAccount();
    const {disconnect} = useDisconnect();

    return (
        <div className="flex flex-row p-2 bg-white border">
            <div className="flex flex-col items-start">
                <span>{collapseAddress(address, 8)}</span>
                <button onClick={() => disconnect()} className="text-red-600">Disconnect</button>
                <div className="flex flex-row text-sm items-center">
                    Change Theme: <SwitchTheme/>
                </div>
            </div>
        </div>
    );
}
