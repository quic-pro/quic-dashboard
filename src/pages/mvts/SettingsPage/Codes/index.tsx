import {useState} from 'react';

import Loader from '../../../../components/Loader';
import {useOwnerCodes} from '../../../../hooks/mvts/rootRouter';
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
            {ownerCodes.data.map((ownedByAccount, code) => {
                if (ownedByAccount) {
                    return (
                        <button
                            key={code}
                            onClick={() => handleCodeSelection(code)}
                            className="border p-1 m-1"
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
                className="border p-1 m-1"
            >
                Refresh
            </button>
            {selectedCode && <Control code={selectedCode}/>}
        </div>
    );
}
