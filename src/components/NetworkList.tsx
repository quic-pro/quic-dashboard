import {RxCheck} from 'react-icons/rx';
import {useNetwork, useSwitchNetwork} from 'wagmi';


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
        <div className="flex flex-col border">
            {chains.map((chain) => (
                <button key={chain.id} onClick={() => handlerClick(chain.id)} className="flex flex-row">
                    <span>{chain.name}</span>
                    {chain.id === currentChain?.id && <RxCheck className="text-2xl text-green-600"/>}
                </button>
            ))}
        </div>
    );
}
