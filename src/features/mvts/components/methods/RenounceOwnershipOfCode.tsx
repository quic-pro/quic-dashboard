import {useRenounceOwnershipOfCode} from '../../hooks/useRootRouterTransaction';
import Base from './Base';


type Props = {
    code: number;
};


export default function RenounceOwnershipOfCode({code}: Props) {
    const renounceOwnershipOfCode = useRenounceOwnershipOfCode();

    return <Base name="Renounce Ownership" code={code} method={renounceOwnershipOfCode}/>;
}
