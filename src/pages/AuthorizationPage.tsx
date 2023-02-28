import {ConnectWallet} from 'features/web3';
import {Link, useLocation} from 'react-router-dom';
import {useAccount} from 'wagmi';


export default function AuthorizationPage() {
    const {isConnected} = useAccount();
    const location = useLocation();

    return (
        <div className="container flex-1 flex flex-col justify-center items-center">
            <div className="flex flex-col w-4/5 sm:w-3/5 md:w-2/4 lg:w-3/5 xl:w-2/4 2xl:w-2/5">
                <ConnectWallet/>
                {
                    isConnected
                        ? (
                            <Link
                                to={location.state?.redirectTo ?? '/dashboard'}
                                className="mt-4 border rounded-xl p-2 bg-quicBlueL-300 hover:shadow-lg hover:shadow-gray-400/30 text-center"
                            >
                                Go dashboard
                            </Link>
                        )
                        : (
                            <div
                                className="mt-4 border rounded-xl p-2 bg-quicBlueL-200 text-center"
                            >
                                You must connect your wallet
                            </div>
                        )
                }
            </div>
        </div>
    );
}
