import {RootRouter} from '@mvts/contract-interfaces-js';


type Props = {
    data: RootRouter.CodeDataStructOutput;
};


export default function PoolInfo({data}: Props) {
    return (
        <div>
            <div>
                <span className="mr-2">Mode:</span>
                <span>Pool</span>
            </div>
            <div>
                <span className="mr-2">Router:</span>
            </div>
            <div className="ml-5">
                <div>
                    <span className="mr-2">Chain ID:</span>
                    <span>{data.router.chainId.toString()}</span>
                </div>
                <div className="w-[300px] md:w-full">
                    <span className="mr-2">Address:</span>
                    <span className="break-words">{data.router.adr}</span>
                </div>
                <div>
                    <span className="mr-2">Pool code length:</span>
                    <span>{data.router.poolCodeLength.toString()}</span>
                </div>
            </div>
        </div>
    );
}
