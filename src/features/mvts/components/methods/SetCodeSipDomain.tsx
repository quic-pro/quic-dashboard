import {InputString} from 'components/ui/inputs';
import {useRef, useState} from 'react';

import {useSetCodeSipDomain} from '../../hooks/useRootRouterTransaction';
import Base from './Base';


type Props = {
    code: number;
};


export default function SetCodeSipDomain({code}: Props) {
    const setCodeSipDomain = useSetCodeSipDomain();

    const [isDisabled, setIsDisabled] = useState(true);
    const inputNewSipDomain = useRef<HTMLInputElement>(null);

    const handleChange = () => {
        setIsDisabled(!inputNewSipDomain.current?.value.length);
    };

    const handleCall = () => {
        setCodeSipDomain(code, inputNewSipDomain.current!.value);
    };

    return (
        <Base name="Set SIP Domain" disabled={isDisabled} handleCall={handleCall}>
            <InputString placeholder="newSipDomain" onChange={handleChange}/>
        </Base>
    );
}
