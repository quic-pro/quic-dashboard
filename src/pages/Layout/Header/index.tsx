import Logo from 'components/Logo';

import Navbar from './Navbar';
import WalletConnectionButton from './WalletConnectionButton';


export default function Header() {
    return (
        <header className="flex flex-col sm:flex-row px-2 sm:px-6 py-2 shadow-lg shadow-gray-400/30">
            <div className="flex-1 flex flex-row justify-between items-center">
                <Logo size="36px" className="text-3xl"/>
                <Navbar className="hidden sm:flex"/>
                <WalletConnectionButton/>
            </div>
            <div className="flex mt-3 sm:hidden justify-start">
                <Navbar/>
            </div>
        </header>
    );
}
