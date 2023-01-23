import {useAccount, useDisconnect} from 'wagmi';

import {collapseAddress} from '../utils/wallet';


export default function AccountInfo() {
    const {address} = useAccount();
    const {disconnect} = useDisconnect();

    return (
        <div className="flex flex-row p-2 bg-white border">
            <div>
                <span>{collapseAddress(address, 8)}</span>
                <button onClick={() => disconnect()} className="text-red-600">Disconnect</button>
            </div>
        </div>
    );
}
