import {useAccount} from 'wagmi';

import {collapseAddress} from '../utils/wallet';


export default function AccountInfo() {
    const {address} = useAccount();

    return (
        <div className="flex flex-row border items-center">
            <span>{collapseAddress(address, 8)}</span>
        </div>
    );
}
