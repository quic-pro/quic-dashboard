import {ButtonHTMLAttributes, useEffect} from 'react';
import {AiOutlineRight} from 'react-icons/ai';
import {useNavigate} from 'react-router-dom';
import {useRecoilState} from 'recoil';
import {useAccount, useConnect} from 'wagmi';

import coinbaseWalletIcon from '../../assets/wallet/icons/Coinbase.png';
import injectedIcon from '../../assets/wallet/icons/Injected.png';
import ledgerIcon from '../../assets/wallet/icons/Ledger.png';
import metaMaskIcon from '../../assets/wallet/icons/MetaMask.png';
import walletIcon from '../../assets/wallet/icons/Wallet.png';
import walletConnectIcon from '../../assets/wallet/icons/WalletConnect.png';
import {SUPPORTED_CONNECTORS} from '../../constants/connectors';
import {notificationListState, NotificationType} from '../../state/app';
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


export default function ConnectorButton({connector, className = '', ...attributes}: Props) {
    const [notificationList, setNotificationList] = useRecoilState(notificationListState);
    const navigate = useNavigate();
    const {connector: currentConnector} = useAccount();
    const {connect, pendingConnector, isLoading, isError, error, isSuccess} = useConnect();

    const handleClick = () => {
        if (connector !== currentConnector) {
            connect({connector});
        } else {
            navigate('/dashboard');
        }
    };

    useEffect(() => {
        if (isError) {
            setNotificationList([...notificationList, {
                type: NotificationType.ERROR,
                context: `Wallet not connected: ${error?.message ?? 'Unknown error'}.`,
            }]);
        }
    }, [isError]);

    useEffect(() => {
        if (isSuccess) {
            setNotificationList([...notificationList, {
                type: NotificationType.SUCCESS,
                context: 'The wallet is connected. Now you can go to the dashboard.',
            }]);
        }
    }, [isSuccess]);

    return (
        <button
            {...attributes}
            onClick={handleClick}
            className={'flex flex-row flex-1 p-1 border-2 rounded-lg items-center justify-between ' + className}
        >
            <img src={getWalletIconSource(connector.id)} alt={`${connector.name} icon`} height="40px" width="40px"/>
            <span>{connector.name}</span>
            <div className="flex flex-row w-[40px] h-[40px] justify-center items-center">
                {connector === currentConnector && <AiOutlineRight className="text-2xl"/>}
                {isLoading && (connector === pendingConnector) && <Loader/>}
            </div>
        </button>
    );
}
