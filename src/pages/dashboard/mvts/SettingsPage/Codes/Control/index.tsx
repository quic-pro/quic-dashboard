import Loader from 'components/ui/Loader';
import {useCodeData} from 'features/mvts';

import NumberMode from './NumberMode';
import PoolMode from './PoolMode';


type Props = {
    code: number;
};


export default function Control({code}: Props) {
    const codeData = useCodeData(code);

    if (codeData.data === null) {
        return <Loader/>;
    }

    return (
        <div className="flex-1 flex flex-col bg-quicBlueL dark:bg-quicBlueD rounded-lg p-2 mt-2">
            {codeData.data.mode === 0 ? <NumberMode code={code}
                data={codeData.data}/> : <PoolMode code={code} data={codeData.data}/>}
        </div>
    );
}
