import {useState} from 'react';

import Loader from '../../../../components/Loader';
import {useAccountCodes} from '../../../../hooks/mvts/rootRouter';
import Control from './Control';


export default function Codes() {
    const [selectedCode, setSelectedCode] = useState<number | null>(null);

    const accountCodes = useAccountCodes();

    const loadData = () => {
        accountCodes.refresh();
    };

    const handleCodeSelection = (code: number) => {
        setSelectedCode(code === selectedCode ? null : code);
    };

    if (accountCodes.data === null) {
        return <Loader/>;
    }

    return (
        <div>
            <div className="flex flex-wrap">
                {accountCodes.data.map((code) => (
                    <button
                        key={code}
                        onClick={() => handleCodeSelection(code)}
                        className="border rounded-md p-1 m-1 w-[42px] h-[34px]
                            bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                            dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
                    >
                        {code}
                    </button>
                ))}
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
