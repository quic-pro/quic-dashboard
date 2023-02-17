import {useClearCodeRouter} from '../../hooks/useRootRouterTransaction';
import Base from './Base';


type Props = {
    code: number;
};


export default function ClearCodeRouter({code}: Props) {
    const clearCodeRouter = useClearCodeRouter();

    return <Base name="Clear Router" code={code} method={clearCodeRouter}/>;
}
