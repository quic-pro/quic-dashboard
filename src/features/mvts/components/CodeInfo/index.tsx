import {CodeMode, RootRouter} from '@mvts/contract-interfaces-js';

import NumberInfo from './NumberInfo';
import PoolInfo from './PoolInfo';


type Props = {
    data: RootRouter.CodeDataStructOutput;
};


export default function CodeInfo({data}: Props) {
    return data.mode === CodeMode.Number ? <NumberInfo data={data}/> : <PoolInfo data={data}/>;
}
