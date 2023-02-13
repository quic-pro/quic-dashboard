import {useState} from 'react';

import Loader from '../../../../../components/ui/Loader';
import {useOwnerCodes} from '../../../../../features/mvts/hooks/useRootRouter';
import Control from './Control';


export default function Codes() {
    const [selectedCode, setSelectedCode] = useState<number | null>(null);

    const ownerCodes = useOwnerCodes();

    const loadData = () => {
        ownerCodes.refresh();
    };

    const handleCodeSelection = (code: number) => {
        setSelectedCode(code === selectedCode ? null : code);
    };

    if (ownerCodes.data === null) {
        return <Loader/>;
    }

    return (
        <div>
            <div className="flex flex-wrap">
                {ownerCodes.data.map((ownedByAccount, code) => {
                    if (ownedByAccount) {
                        return (
                            <button
                                key={code}
                                onClick={() => handleCodeSelection(code)}
                                className="border rounded-md p-1 m-1 w-[42px] h-[34px]
                                    bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                                    dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
                            >
                                {code}
                            </button>
                        );
                    } else {
                        return null;
                    }
                })}
                <button
                    onClick={loadData}
                    className="border rounded-md p-1 m-1 bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                        dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
                >
                    Refresh
                </button>
            </div>
            {selectedCode && <Control code={selectedCode}/>}
        </div>
    );
}
