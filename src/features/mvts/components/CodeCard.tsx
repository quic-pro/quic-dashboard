import {CodeStatus} from '@mvts/contract-interfaces-js';
import Loader from 'components/ui/Loader';
import {HiOutlineRefresh} from 'react-icons/hi';

import {useCodeData, useMintPrice} from '../hooks/useRootRouterData';
import {getCodeStatus} from '../utils/сodeStatus';
import {Mint} from './methods';


type Props = {
    code: number;
};


export default function CodeCard({code}: Props) {
    const codeData = useCodeData(code);
    const mintPrice = useMintPrice();
    if ((codeData.data == null) || (mintPrice.data == null)) {
        return <Loader/>;
    }

    const handleRefresh = () => {
        codeData.refresh();
    };

    return (
        <div className="flex-1 flex flex-col bg-quicBlueL dark:bg-quicBlueD rounded-lg p-2 mt-2">
            <div className="mb-2">
                <button
                    onClick={handleRefresh}
                    className="flex border rounded-md px-2 py-1 h-8 items-center
                        bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                        dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
                >
                    <HiOutlineRefresh className="mr-1"/>
                    Refresh
                </button>
            </div>
            <span>Code: {code}</span>
            <span>Status: {getCodeStatus(codeData.data.status)}</span>
            {
                codeData.data.status === CodeStatus.AvailableForMinting
                    ? <Mint code={code}/>
                    : <span>This code is not available for minting.</span>
            }
        </div>
    );
}
