import {RootRouter} from '@mvts/contract-interfaces-js';

import CodeInfo from '../CodeInfo';
import {
    ChangeCodeMode,
    ClearCodeRouter,
    RenounceOwnershipOfCode,
    SafeTransferFrom,
    SetCodeRouter,
} from '../methods';


type Props = {
    code: number;
    data: RootRouter.CodeDataStructOutput;
};


const METHODS = [ChangeCodeMode, SetCodeRouter, ClearCodeRouter, SafeTransferFrom, RenounceOwnershipOfCode];


export default function PoolSettings({code, data}: Props) {
    return (
        <div>
            <CodeInfo data={data}/>
            <div className="mt-4">
                {METHODS.map((Method) => (
                    <div key={Method.name}>
                        <Method code={code}/>
                        <hr className="my-6"/>
                    </div>
                ))}
            </div>
        </div>
    );
}
