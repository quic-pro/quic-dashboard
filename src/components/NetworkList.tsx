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

        switchNetwork(chainId);
    };

    return (
        <div className="flex flex-col border">
            {chains.map((chain) => {
                if (chain.id === currentChain?.id) {
                    return (
                        <button key={chain.id} className="flex flex-row text-green-600">
                            <span>{chain.name}</span>
                            <RxCheck/>
                        </button>
                    );
                }

                return (
                    <button key={chain.id} onClick={() => handlerClick(chain.id)}>
                        <span>{chain.name}</span>
                    </button>
                );
            })}
        </div>
    );
}
