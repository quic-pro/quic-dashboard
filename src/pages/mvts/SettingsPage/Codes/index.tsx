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
            {accountCodes.data.map((code) => (
                <button
                    key={code}
                    onClick={() => handleCodeSelection(code)}
                    className="border p-1 m-1"
                >
                    {code}
                </button>
            ))}
            <button
                onClick={loadData}
                className="border p-1 m-1"
            >
                Refresh
            </button>
            {selectedCode && <Control code={selectedCode}/>}
        </div>
    );
}
