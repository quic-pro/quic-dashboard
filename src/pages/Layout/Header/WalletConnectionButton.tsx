import {Link} from 'react-router-dom';
import {collapseAddress} from 'utils/address';
import {useAccount} from 'wagmi';


export default function WalletConnectionButton() {
    const {address} = useAccount();

    return (
        <Link
            to="/authorization"
            className="border rounded-xl px-2 py-1 bg-quicBlueL-300 hover:shadow-lg hover:shadow-gray-400/30"
        >
            {address ? collapseAddress(address, 5) : 'Connect Wallet'}
        </Link>
    );
}
