import {AiFillWarning} from 'react-icons/ai';
import {useAccount, useBalance, useNetwork} from 'wagmi';

import AccountInfo from '../../../../components/AccountInfo';
import NetworkList from '../../../../components/NetworkList';
import DropDown from '../../../../components/ui/DropDown';
import {collapseAddress, roundBalance} from '../../../../utils/wallet';


export default function Account() {
    const {chain: currentChain, chains} = useNetwork();
    const {address} = useAccount();

    const {data: balance} = useBalance({
        address: address!,
        onError(error) {
            // TODO: Show notification with error.message
            console.error(error);
        },
    });

    return (
        <div className="flex flex-row items-center">
            <DropDown>
                {chains.find((chain) => chain.id === currentChain?.id)
                    ? <span>{currentChain?.name}</span>
                    : <span className="flex flex-row"><AiFillWarning className="text-2xl text-yellow-500"/> Unsupported</span>}
                <NetworkList/>
            </DropDown>
            <hr className="w-px h-full bg-black mx-3"/>
            <DropDown>
                <span>{collapseAddress(address)}</span>
                <AccountInfo/>
            </DropDown>
            <hr className="w-px h-full bg-black mx-3 hidden md:block"/>
            <div className="flex flex-row hidden md:block">
                {balance ? <span>{roundBalance(balance.value)} {balance.symbol}</span> : <span>Fetching...</span>}
            </div>
        </div>
    );
}
