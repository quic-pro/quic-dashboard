import {useAccount, useBalance, useNetwork} from 'wagmi';

import AccountInfo from '../../../../components/AccountInfo';
import NetworkList from '../../../../components/NetworkList';
import DropDown from '../../../../components/ui/DropDown';
import {collapseAddress, roundBalance} from '../../../../utils/wallet';


export default function Account() {
    const {chain} = useNetwork();
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
                <span>{chain?.name}</span>
                <NetworkList/>
            </DropDown>
            <hr className="w-px h-full bg-black mx-3"/>
            <DropDown>
                <span>{collapseAddress(address)}</span>
                <AccountInfo/>
            </DropDown>
            <hr className="w-px h-full bg-black mx-3"/>
            <div className="flex flex-row">
                {balance ? <span>{roundBalance(balance.value)} {balance.symbol}</span> : <span>Fetching...</span>}
            </div>
        </div>
    );
}
