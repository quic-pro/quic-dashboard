import {Link} from 'react-router-dom';


export default function WalletConnectionButton() {
    return (
        <Link to="/" className="border rounded-xl px-2 py-1 bg-quicBlueL-300 hover:shadow-lg hover:shadow-gray-400/30">Connect Wallet</Link>
    );
}
