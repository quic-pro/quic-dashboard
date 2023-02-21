import {InputNumber, InputString} from 'components/ui/inputs';

import {useSetCodeRouter} from '../../hooks/useRootRouterTransaction';
import Base, {InputField} from './Base';


type Props = {
    code: number;
};


const INPUT_FIELDS: InputField[] = [
    {
        InputElement: InputNumber,
        placeholder: 'newChainId',
    },
    {
        InputElement: InputString,
        placeholder: 'newAdr',
    },
    {
        InputElement: InputNumber,
        placeholder: 'newPoolCodeLength',
    },
];


export default function SetCodeRouter({code}: Props) {
    const setCodeRouter = useSetCodeRouter();

    return <Base name="Set Router" inputFields={INPUT_FIELDS} code={code} method={setCodeRouter}/>;
}
