import {InputString} from 'components/ui/inputs';
import {useRef, useState} from 'react';
import {useAccount} from 'wagmi';

import {useSafeTransferFrom} from '../../hooks/useRootRouterTransaction';
import Base from './Base';


type Props = {
    code: number;
};


export default function SafeTransferFrom({code}: Props) {
    const safeTransferFrom = useSafeTransferFrom();

    const [isDisabled, setIsDisabled] = useState(true);
    const inputTo = useRef<HTMLInputElement>(null);

    const {address} = useAccount();

    const handleChange = () => {
        setIsDisabled(!inputTo.current?.value.length);
    };

    const handleCall = () => {
        safeTransferFrom(address!, inputTo.current!.value, code);
    };

    return (
        <Base name="Transfer" disabled={isDisabled} handleCall={handleCall}>
            <InputString ref={inputTo} placeholder="to" onChange={handleChange}/>
        </Base>
    );
}
