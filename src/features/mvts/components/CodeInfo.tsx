import {CodeStatus} from '@mvts/contract-interfaces-js';
import Loader from 'components/ui/Loader';
import {HiOutlineRefresh} from 'react-icons/hi';

import {useCodeData, useMintPrice} from '../hooks/useRootRouterData';
import {useMint} from '../hooks/useRootRouterTransaction';
import {getCodeStatus} from '../utils/getCodeStatus';


type Props = {
    code: number;
};


export default function CodeInfo({code}: Props) {
    const mint = useMint();

    const codeData = useCodeData(code);
    const mintPrice = useMintPrice();
    if ((codeData.data == null) || (mintPrice.data == null)) {
        return <Loader/>;
    }

    const handleRefresh = () => {
        codeData.refresh();
    };

    return (
        <div className="border flex flex-col">
            <button
                onClick={handleRefresh}
                className="border rounded-md p-1 m-1
                        bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                        dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
            >
                <HiOutlineRefresh/>
            </button>
            <span>Status: {getCodeStatus(codeData.data.status)}</span>
            {
                codeData.data.status === CodeStatus.AvailableForMinting
                    ? (
                        <div>
                            <span>This code is available for minting:</span>
                            <button
                                onClick={() => mintPrice.data && mint(code, {value: mintPrice.data})}
                                className="border">
                                Mint
                            </button>
                        </div>
                    )
                    : <span>This code is not available for minting.</span>
            }
        </div>
    );
}
