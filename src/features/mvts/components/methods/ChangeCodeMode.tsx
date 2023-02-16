import {useModeChangePrice} from '../../hooks/useRootRouterData';
import {useChangeCodeMode} from '../../hooks/useRootRouterTransaction';
import Base from './Base';


type Props = {
    code: number;
};


export default function ChangeCodeMode({code}: Props) {
    const changeCodeMode = useChangeCodeMode();
    const modeChangePrice = useModeChangePrice();

    const handleCall = () => {
        changeCodeMode(code, {value: modeChangePrice.data!});
    };

    return <Base name="Change Mode" disabled={!modeChangePrice.data} handleCall={handleCall}/>;
}
