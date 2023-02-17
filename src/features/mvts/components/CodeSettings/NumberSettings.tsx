import {RootRouter} from '@mvts/contract-interfaces-js';

import CodeInfo from '../CodeInfo';
import {
    ChangeCodeMode,
    ClearCodeSipDomain,
    RenounceOwnershipOfCode,
    SafeTransferFrom,
    SetCodeSipDomain,
} from '../methods';


type Props = {
    code: number;
    data: RootRouter.CodeDataStructOutput;
};


const METHODS = [ChangeCodeMode, SetCodeSipDomain, ClearCodeSipDomain, SafeTransferFrom, RenounceOwnershipOfCode];


export default function NumberSettings({code, data}: Props) {
    return (
        <div>
            <CodeInfo data={data}/>
            <div className="mt-4">
                <hr className="my-6"/>
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
