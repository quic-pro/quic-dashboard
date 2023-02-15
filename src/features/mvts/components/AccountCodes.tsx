import {AddressZero} from '@ethersproject/constants';
import Loader from 'components/ui/Loader';
import {useState} from 'react';
import {HiOutlineRefresh} from 'react-icons/hi';
import {useAccount} from 'wagmi';

import {useOwnerCodes} from '../hooks/useRootRouterData';


type Props = {
    details?: (props: ContentProps) => JSX.Element;
};

type ContentProps = {
    code: number;
};


export default function AccountCodes({details: Details}: Props) {
    const [selectedCode, setSelectedCode] = useState<number | null>(null);

    const {address} = useAccount();

    const ownerCodes = useOwnerCodes(address ?? AddressZero);
    if (ownerCodes.data == null) {
        return <Loader/>;
    }

    const handleRefresh = () => {
        setSelectedCode(null);
        ownerCodes.refresh();
    };

    const handleCodeSelection = (code: number) => {
        setSelectedCode(code);
    };

    return (
        <div>
            <div className="flex flex-wrap">
                {ownerCodes.data.map((ownedByAccount, code) => {
                    if (!ownedByAccount) {
                        return null;
                    }

                    return (
                        <button
                            key={code}
                            disabled={!Details}
                            onClick={() => handleCodeSelection(code)}
                            className="border rounded-md p-1 m-1 w-[42px] h-[34px]
                                bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                                dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
                        >
                            {code}
                        </button>
                    );
                })}
                <button
                    onClick={handleRefresh}
                    className="border rounded-md p-1 m-1
                        bg-quicBlueL hover:bg-quicBlueL-200 text-quicBlueL-400
                        dark:bg-quicBlueD dark:hover:bg-quicBlueD-200 dark:text-quicBlueD-400"
                >
                    <HiOutlineRefresh/>
                </button>
            </div>
            {Details && (selectedCode !== null) && <Details code={selectedCode}/>}
        </div>
    );
}
