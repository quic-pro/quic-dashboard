import Settings from 'components/Settings';
import DropDown from 'components/ui/DropDown';
import Loader from 'components/ui/Loader';
import {AccountInfo, NetworkList} from 'features/web3';
import {useAddErrorNotification} from 'hooks/useAddNotification';
import {AiFillWarning} from 'react-icons/ai';
import {IoMdSettings} from 'react-icons/io';
import {collapseAddress} from 'utils/address';
import {roundBigNumber} from 'utils/bigNumber';
import {useAccount, useBalance, useNetwork} from 'wagmi';


export default function Account() {
    const {chain: currentChain, chains} = useNetwork();
    const {address} = useAccount();

    const addErrorNotification = useAddErrorNotification();

    const {data: balance, isLoading} = useBalance({
        address: address!,
        onError(error) {
            addErrorNotification(`Failed to get wallet balance: ${error.message}.`);
        },
    });

    return (
        <div className="flex flex-row items-center">
            <DropDown mode="details">
                <span>{collapseAddress(address)}</span>
                <AccountInfo/>
            </DropDown>
            <hr className="w-px h-full bg-black mx-2 sm:mx-3"/>
            {
                chains.find((chain) => chain.id === currentChain?.id)
                    ? (
                        <>
                            <DropDown mode="list">
                                <span>{currentChain?.name}</span>
                                <NetworkList/>
                            </DropDown>
                            <hr className="w-px h-full bg-black mx-3 hidden md:block"/>
                            <div className="flex flex-row hidden md:block">
                                {
                                    isLoading || !balance
                                        ? <Loader size="20px"/>
                                        : <span>{roundBigNumber(balance.value)} {balance.symbol}</span>
                                }
                            </div>
                        </>
                    )
                    : (
                        <DropDown mode="list">
                            <span className="flex flex-row">
                                <AiFillWarning className="text-2xl text-yellow-500"/>
                                Unsupported chain
                            </span>
                            <NetworkList/>
                        </DropDown>
                    )
            }
            <hr className="w-px h-full bg-black mx-2 sm:mx-3"/>
            <DropDown mode="details">
                <IoMdSettings className="text-2xl"/>
                <Settings/>
            </DropDown>
        </div>
    );
}
