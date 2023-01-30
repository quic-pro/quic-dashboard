import Loader from '../../../../../components/Loader';
import {useCodeData} from '../../../../../hooks/mvts/rootRouter';
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
        <div className="flex-1 flex flex-col bg-gray-100 rounded-lg p-2">
            {codeData.data.mode === 0 ? <NumberMode code={code} data={codeData.data}/> : <PoolMode code={code} data={codeData.data}/>}
        </div>
    );
}
