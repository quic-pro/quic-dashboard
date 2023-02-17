import {InputString} from 'components/ui/inputs';
import {useAccount} from 'wagmi';

import {useSafeTransferFrom} from '../../hooks/useRootRouterTransaction';
import Base from './Base';


type Props = {
    code: number;
};


export default function SafeTransferFrom({code}: Props) {
    const safeTransferFrom = useSafeTransferFrom();

    const {address} = useAccount();

    return (
        <Base
            name="Transfer"
            inputs={[
                {
                    Input: InputString,
                    placeholder: 'to',
                },
            ]}
            code={code}
            method={(code: number, to: string) => safeTransferFrom(address!, to, code)}
        >
        </Base>
    );
}
