import {collapseAddress} from 'utils/address';
import {useAccount, useDisconnect} from 'wagmi';


export default function AccountInfo() {
    const {address} = useAccount();
    const {disconnect} = useDisconnect();

    const handleDisconnect = () => {
        disconnect();
    };

    return (
        <div className="flex flex-row p-2 bg-white border">
            <div className="flex flex-col items-start">
                <span>{collapseAddress(address, 8)}</span>
                <button onClick={handleDisconnect} className="text-red-600">Disconnect</button>
            </div>
        </div>
    );
}
