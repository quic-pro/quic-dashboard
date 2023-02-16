import {useRenounceOwnershipOfCode} from '../../hooks/useRootRouterTransaction';
import Base from './Base';


type Props = {
    code: number;
};


export default function RenounceOwnershipOfCode({code}: Props) {
    const renounceOwnershipOfCode = useRenounceOwnershipOfCode();

    const handleCall = () => {
        renounceOwnershipOfCode(code);
    };

    return <Base name="Renounce Ownership" handleCall={handleCall}/>;
}
