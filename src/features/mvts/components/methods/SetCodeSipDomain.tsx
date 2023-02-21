import {InputString} from 'components/ui/inputs';

import {useSetCodeSipDomain} from '../../hooks/useRootRouterTransaction';
import Base, {InputField} from './Base';


type Props = {
    code: number;
};


const INPUT_FIELDS: InputField[] = [
    {
        InputElement: InputString,
        placeholder: 'newSipDomain',
    },
];


export default function SetCodeSipDomain({code}: Props) {
    const setCodeSipDomain = useSetCodeSipDomain();

    return <Base name="Set SIP Domain" inputFields={INPUT_FIELDS} code={code} method={setCodeSipDomain}/>;
}
