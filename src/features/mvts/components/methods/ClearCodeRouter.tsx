import {useClearCodeRouter} from '../../hooks/useRootRouterTransaction';
import Base from './Base';


type Props = {
    code: number;
};


export default function ClearCodeRouter({code}: Props) {
    const clearCodeRouter = useClearCodeRouter();

    const handleCall = () => {
        clearCodeRouter(code);
    };

    return <Base name="Clear Router" handleCall={handleCall}/>;
}
