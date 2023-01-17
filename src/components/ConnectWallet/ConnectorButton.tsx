import {ButtonHTMLAttributes} from 'react';
import {useAccount, useConnect} from 'wagmi';

import coinbaseWalletIcon from '../../assets/wallet/icons/Coinbase.png';
import injectedIcon from '../../assets/wallet/icons/Injected.png';
import ledgerIcon from '../../assets/wallet/icons/Ledger.png';
import metaMaskIcon from '../../assets/wallet/icons/MetaMask.png';
import walletIcon from '../../assets/wallet/icons/Wallet.png';
import walletConnectIcon from '../../assets/wallet/icons/WalletConnect.png';
import {SUPPORTED_CONNECTORS} from '../../constants/connectors';
import {getStyle} from '../../utils/style';
import Loader from '../Loader';


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


export default function ConnectorButton({connector, className, ...attributes}: Props) {
    const {connector: currentConnector} = useAccount();
    const {connect, pendingConnector, isLoading} = useConnect();

    const style = {
        container: getStyle('flex flex-row w-full p-1 border-2 rounded-lg items-center justify-between', className),
        loader: 'h-[40px] w-[40px]',
    };

    return (
        <button
            {...attributes}
            onClick={() => connect({connector})}
            className={style.container}
        >
            {connector.name} {connector === currentConnector && '[connected]'}
            <div className="flex flex-row">
                {isLoading && (connector === pendingConnector) && <Loader className={style.loader}/>}
                <img src={getWalletIconSource(connector.id)} alt={`${connector.name} icon`} height="40px" width="40px"/>
            </div>
        </button>
    );
}
