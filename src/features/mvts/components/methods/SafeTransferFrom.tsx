import {InputString} from 'components/ui/inputs';
import {useAccount} from 'wagmi';

import {useSafeTransferFrom} from '../../hooks/useRootRouterTransaction';
import Base, {InputField} from './Base';


type Props = {
    code: number;
};


const INPUT_FIELDS: InputField[] = [
    {
        InputElement: InputString,
        placeholder: 'to',
    },
];

export default function SafeTransferFrom({code}: Props) {
    const safeTransferFrom = useSafeTransferFrom();

    const {address} = useAccount();

    const method = (code: number, to: string) => safeTransferFrom(address!, to, code);

    return <Base name="Transfer" inputFields={INPUT_FIELDS} code={code} method={method}/>;
}
