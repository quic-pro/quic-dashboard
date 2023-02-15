import {CodeMode} from '@mvts/contract-interfaces-js';
import Loader from 'components/ui/Loader';
import {HiOutlineRefresh} from 'react-icons/hi';

import {useCodeData} from '../../hooks/useRootRouterData';
import NumberSettings from './NumberSettings';
import PoolSettings from './PoolSettings';


type Props = {
    code: number;
};


export default function CodeSettings({code}: Props) {
    const codeData = useCodeData(code);
    if (codeData.data === null) {
        return <Loader/>;
    }

    const handleRefresh = () => {
        codeData.refresh();
    };

    return (
        <div className="flex-1 flex flex-col bg-quicBlueL dark:bg-quicBlueD rounded-lg p-2 mt-2">
            <button
                onClick={handleRefresh}
                className="border rounded-md p-1 m-1
                        bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                        dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
            >
                <HiOutlineRefresh/>
            </button>
            {
                codeData.data.mode === CodeMode.Number
                    ? <NumberSettings code={code} data={codeData.data}/>
                    : <PoolSettings code={code} data={codeData.data}/>
            }
        </div>
    );
}
