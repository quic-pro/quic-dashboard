import Logo from 'components/Logo';

import Navbar from './Navbar';
import WalletConnectionButton from './WalletConnectionButton';


export default function Header() {
    return (
        <header className="flex flex-row h-12 px-6 justify-between items-center shadow-lg shadow-gray-400/30">
            <Logo size="36px" className="text-3xl"/>
            <Navbar/>
            <WalletConnectionButton/>
        </header>
    );
}
