import {useModeChangePrice} from '../../hooks/useRootRouterData';
import {useChangeCodeMode} from '../../hooks/useRootRouterTransaction';
import Base from './Base';


type Props = {
    code: number;
};


export default function ChangeCodeMode({code}: Props) {
    const changeCodeMode = useChangeCodeMode();
    const modeChangePrice = useModeChangePrice();


    return <Base name="Change Mode" code={code} method={(code: number) => changeCodeMode(code, {value: modeChangePrice.data!})}/>;
}
