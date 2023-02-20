import logo from 'assets/logo.png';
import {ConnectWallet} from 'features/web3';


export default function MainPage() {
    return (
        <div className="flex-1 flex flex-row">
            <div className="absolute left-4 top-4 flex">
                <img src={logo} alt="Company `s logo" width="48px" height="48px"/>
                <span className="ml-2 text-white font-bold text-5xl drop-shadow-lg">QUIC-PRO</span>
            </div>
            <div className="container flex-1 lg:flex flex-col bg-[url('assets/backgrounds/main.png')] hidden"></div>
            <div className="container flex-1 flex flex-col bg-white justify-center items-center">
                <ConnectWallet className="w-4/5 sm:w-3/5 md:w-2/4 lg:w-3/5 xl:w-2/4 2xl:w-2/5"/>
            </div>
        </div>
    );
}
