import {ReactNode} from 'react';
import {RxCheck} from 'react-icons/rx';
import {useRecoilState} from 'recoil';
import {Chain, useNetwork, useSwitchNetwork} from 'wagmi';

import {ReactComponent as BnbChainIcon} from '../assets/chain/icons/BnbChain.svg';
import {ReactComponent as EthereumIcon} from '../assets/chain/icons/Ethereum.svg';
import {ReactComponent as PolygonIcon} from '../assets/chain/icons/Polygon.svg';
import {notificationListState, NotificationType} from '../state/app';


function getChainIcon(name: string, size = '25px'): ReactNode {
    const attributes = {
        width: size,
        height: size,
    };

    switch (name) {
        case 'Sepolia':
        case 'Ethereum':
            return <EthereumIcon {...attributes}/>;
        case 'Polygon Mumbai':
        case 'Polygon':
            return <PolygonIcon {...attributes}/>;
        case 'Binance Smart Chain Testnet':
        case 'BNB Smart Chain':
            return <BnbChainIcon {...attributes}/>;
        default:
            return null;
    }
}


export default function NetworkList() {
    const [notificationList, setNotificationList] = useRecoilState(notificationListState);
    const {chain: currentChain, chains} = useNetwork();
    const {switchNetworkAsync} = useSwitchNetwork();

    const handlerClick = (chain: Chain) => {
        if (chain.id !== currentChain?.id) {
            switchNetworkAsync?.(chain.id)
                .then((chain) => {
                    setNotificationList([...notificationList, {
                        type: NotificationType.SUCCESS,
                        context: `The network has changed to ${chain.name}`,
                    }]);
                })
                .catch((error) => {
                    let message = 'Unknown error';
                    if (typeof error === 'string') {
                        message = error;
                    }else if (error instanceof Error) {
                        message = error.message;
                    }

                    setNotificationList([...notificationList, {
                        type: NotificationType.ERROR,
                        context: `Failed to change network: ${message}.`,
                    }]);
                });
        }
    };

    return (
        <div className="flex flex-col bg-white border p-2 w-[280px]">
            {chains.map((chain) => (
                <button key={chain.id} onClick={() => handlerClick(chain)}
                    className="flex flex-row p-1 justify-between">
                    {getChainIcon(chain.name)}
                    <span>{chain.name}</span>
                    <div>
                        {chain.id === currentChain?.id && <RxCheck className="text-2xl text-green-600"/>}
                    </div>
                </button>
            ))}
        </div>
    );
}
