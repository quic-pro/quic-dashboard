import {InputNumber, InputString} from 'components/ui/inputs';
import {useRef, useState} from 'react';

import {useSetCodeRouter} from '../../hooks/useRootRouterTransaction';
import Base from './Base';


type Props = {
    code: number;
};


export default function SetCodeRouter({code}: Props) {
    const setCodeRouter = useSetCodeRouter();

    const [isDisabled, setIsDisabled] = useState(true);
    const inputNewChainId = useRef<HTMLInputElement>(null);
    const inputNewAdr = useRef<HTMLInputElement>(null);
    const inputNewPoolCodeLength = useRef<HTMLInputElement>(null);

    const handleChange = () => {
        setIsDisabled(
            !inputNewChainId.current?.value.length ||
            !inputNewAdr.current?.value.length ||
            !inputNewPoolCodeLength.current?.value.length,
        );
    };

    const handleCall = () => {
        setCodeRouter(
            code,
            inputNewChainId.current!.value,
            inputNewAdr.current!.value,
            inputNewPoolCodeLength.current!.value,
        );
    };

    return (
        <Base name="Set Router" disabled={isDisabled} handleCall={handleCall}>
            <InputNumber ref={inputNewChainId} placeholder="newChainId" onChange={handleChange}/>
            <InputString ref={inputNewAdr} placeholder="newAdr" onChange={handleChange}/>
            <InputNumber ref={inputNewPoolCodeLength} placeholder="newPoolCodeLength" onChange={handleChange}/>
        </Base>
    );
}
