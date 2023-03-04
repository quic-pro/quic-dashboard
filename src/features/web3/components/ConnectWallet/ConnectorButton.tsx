import Loader from 'components/ui/Loader';
import {useAddErrorNotification, useAddSuccessNotification} from 'hooks/useAddNotification';
import {ButtonHTMLAttributes} from 'react';
import {GrStatusCriticalSmall} from 'react-icons/gr';
import {useAccount, useConnect, useDisconnect} from 'wagmi';

import coinbaseWalletIcon from '../../assets/wallet/icons/Coinbase.png';
import injectedIcon from '../../assets/wallet/icons/Injected.png';
import ledgerIcon from '../../assets/wallet/icons/Ledger.png';
import metaMaskIcon from '../../assets/wallet/icons/MetaMask.png';
import walletIcon from '../../assets/wallet/icons/Wallet.png';
import walletConnectIcon from '../../assets/wallet/icons/WalletConnect.png';
import {SUPPORTED_CONNECTORS} from '../../constants/connectors';


type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
    connector: typeof SUPPORTED_CONNECTORS[number];
};


function getWalletIconSource(id: string): string | undefined {
    switch (id) {
        case 'injected':
            return injectedIcon;
        case 'metaMask':
            return metaMaskIcon;
        case 'coinbaseWallet':
            return coinbaseWalletIcon;
        case 'walletConnect':
            return walletConnectIcon;
        case 'ledger':
            return ledgerIcon;
        default:
            return walletIcon;
    }
}


export default function ConnectorButton({connector, className = '', ...attributes}: Props) {
    const {connector: currentConnector} = useAccount();
    const {connect, pendingConnector, isLoading, error} = useConnect({
        onError: () => addErrorNotification(`Wallet not connected: ${error?.message ?? 'Unknown error'}.`),
        onSuccess: () => addSuccessNotification('The wallet is connected. Now you can go to the dashboard.'),
    });
    const {disconnect} = useDisconnect({
        onSuccess: () => connect({connector}),
    });

    const addErrorNotification = useAddErrorNotification();
    const addSuccessNotification = useAddSuccessNotification();

    const handleClick = () => {
        if (connector !== currentConnector) {
            connect({connector});
        } else {
            disconnect();
        }
    };

    return (
        <button
            {...attributes}
            onClick={handleClick}
            className={'flex flex-row flex-1 p-1 border-2 hover:shadow-lg hover:shadow-gray-400/30 rounded-lg items-center justify-between ' + className}
        >
            <img src={getWalletIconSource(connector.id)} alt={`${connector.name} icon`} height="40px" width="40px"/>
            <span>{connector.name}</span>
            <div className="flex flex-row w-[40px] h-[40px] justify-center items-center">
                {connector === currentConnector && <GrStatusCriticalSmall className="text-xl text-quicBlueL-300"/>}
                {isLoading && (connector === pendingConnector) && <Loader/>}
            </div>
        </button>
    );
}
