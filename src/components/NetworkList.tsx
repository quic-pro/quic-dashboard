import {ReactNode} from 'react';
import {RxCheck} from 'react-icons/rx';
import {useNetwork, useSwitchNetwork} from 'wagmi';

import {ReactComponent as BnbChainIcon} from '../assets/chain/icons/BnbChain.svg';
import {ReactComponent as EthereumIcon} from '../assets/chain/icons/Ethereum.svg';
import {ReactComponent as PolygonIcon} from '../assets/chain/icons/Polygon.svg';


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
        case 'BNB Chain':
            return <BnbChainIcon {...attributes}/>;
        default:
            return null;
    }
}


export default function NetworkList() {
    const {chain: currentChain, chains} = useNetwork();
    const {switchNetwork} = useSwitchNetwork();

    const handlerClick = (chainId: number) => {
        if (!switchNetwork) {
            // TODO: Show notification
            return;
        }

        if (chainId !== currentChain?.id) {
            switchNetwork(chainId);
        }
    };

    return (
        <div className="flex flex-col bg-white border p-2">
            {chains.map((chain) => (
                <button key={chain.id} onClick={() => handlerClick(chain.id)} className="flex flex-row p-1 justify-between">
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
