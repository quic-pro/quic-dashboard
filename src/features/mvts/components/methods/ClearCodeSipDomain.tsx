import {useClearCodeSipDomain} from '../../hooks/useRootRouterTransaction';
import Base from './Base';


type Props = {
    code: number;
};


export default function ClearCodeSipDomain({code}: Props) {
    const clearCodeSipDomain = useClearCodeSipDomain();

    return <Base name="Clear SIP Domain" code={code} method={clearCodeSipDomain}/>;
}
