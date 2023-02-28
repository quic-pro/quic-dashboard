import {ConnectWallet} from 'features/web3';


export default function AuthorizationPage() {
    return (
        <div className="container flex-1 flex flex-row justify-center items-center">
            <ConnectWallet className="w-4/5 sm:w-3/5 md:w-2/4 lg:w-3/5 xl:w-2/4 2xl:w-2/5"/>
        </div>
    );
}
