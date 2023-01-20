import {RxCheck} from 'react-icons/rx';
import {useNetwork} from 'wagmi';


export default function NetworkList() {
    const {chain: currentChain, chains} = useNetwork();

    return (
        <div className="flex flex-col border">
            {chains.map((chain) => {
                if (chain.id === currentChain?.id) {
                    return (
                        <div key={chain.id} className="flex flex-row text-green-600">
                            <span>{chain.name}</span>
                            <RxCheck/>
                        </div>
                    );
                }

                return (
                    <div key={chain.id}>
                        <span>{chain.name}</span>
                    </div>
                );
            })}
        </div>
    );
}
