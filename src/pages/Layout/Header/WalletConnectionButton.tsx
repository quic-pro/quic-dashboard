import {Link} from 'react-router-dom';
import {useAccount} from 'wagmi';


export default function WalletConnectionButton() {
    const {isConnected} = useAccount();

    return (
        <Link to="/authorization" className="border rounded-xl px-2 py-1 bg-quicBlueL-300 hover:shadow-lg hover:shadow-gray-400/30">
            {isConnected ? 'Change Wallet' : 'Connect Wallet'}
        </Link>
    );
}
