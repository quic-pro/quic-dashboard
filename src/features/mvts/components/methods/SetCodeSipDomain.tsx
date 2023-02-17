import {InputString} from 'components/ui/inputs';

import {useSetCodeSipDomain} from '../../hooks/useRootRouterTransaction';
import Base from './Base';


type Props = {
    code: number;
};


export default function SetCodeSipDomain({code}: Props) {
    const setCodeSipDomain = useSetCodeSipDomain();

    return (
        <Base
            name="Set SIP Domain"
            inputs={[
                {
                    Input: InputString,
                    placeholder: 'newSipDomain',
                },
            ]}
            code={code}
            method={setCodeSipDomain}
        >
        </Base>
    );
}
