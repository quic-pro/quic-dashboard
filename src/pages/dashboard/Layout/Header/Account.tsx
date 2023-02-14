import AccountInfo from 'components/AccountInfo';
import DropDown from 'components/ui/DropDown';
import {NetworkList} from 'features/web3';
import {useAddErrorNotification} from 'hooks/useAddNotification';
import {AiFillWarning} from 'react-icons/ai';
import {collapseAddress} from 'utils/address';
import {roundBigNumber} from 'utils/bigNumber';
import {useAccount, useBalance, useNetwork} from 'wagmi';


export default function Account() {
    const {chain: currentChain, chains} = useNetwork();
    const {address} = useAccount();

    const addErrorNotification = useAddErrorNotification();

    const {data: balance} = useBalance({
        address: address!,
        onError(error) {
            addErrorNotification(`Failed to get wallet balance: ${error.message}.`);
        },
    });

    return (
        <div className="flex flex-row items-center">
            <DropDown>
                <span>{collapseAddress(address)}</span>
                <AccountInfo/>
            </DropDown>
            <hr className="w-px h-full bg-black mx-3"/>
            {chains.find((chain) => chain.id === currentChain?.id)
                ? (
                    <>
                        <DropDown>
                            <span>{currentChain?.name}</span>
                            <NetworkList/>
                        </DropDown>
                        <hr className="w-px h-full bg-black mx-3 hidden md:block"/>
                        <div className="flex flex-row hidden md:block">
                            {balance ? <span>{roundBigNumber(balance.value)} {balance.symbol}</span> : <span>Fetching...</span>}
                        </div>
                    </>
                )
                : (
                    <DropDown>
                        <span className="flex flex-row">
                            <AiFillWarning className="text-2xl text-yellow-500"/>
                            Unsupported chain
                        </span>
                        <NetworkList/>
                    </DropDown>
                )}
        </div>
    );
}
