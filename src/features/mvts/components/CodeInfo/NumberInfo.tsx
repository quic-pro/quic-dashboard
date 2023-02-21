import {RootRouter} from '@mvts/contract-interfaces-js';
import {useAccount} from 'wagmi';


type Props = {
    data: RootRouter.CodeDataStructOutput;
};


export default function NumberInfo({data}: Props) {
    const {address} = useAccount();

    return (
        <div>
            <div>
                <span className="mr-2">Mode:</span>
                <span>Number</span>
            </div>
            <div>
                <span className="mr-2">SIP domain:</span>
                <span>{data.sipDomain}</span>
            </div>
            <div className="w-[300px] md:w-full">
                <span className="mr-2 whitespace-nowrap">SIP URI:</span>
                <span className="break-words">
                    {address}@{data.sipDomain}
                </span>
            </div>
        </div>
    );
}
