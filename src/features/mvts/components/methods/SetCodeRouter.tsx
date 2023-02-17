import {InputNumber, InputString} from 'components/ui/inputs';

import {useSetCodeRouter} from '../../hooks/useRootRouterTransaction';
import Base from './Base';


type Props = {
    code: number;
};


export default function SetCodeRouter({code}: Props) {
    const setCodeRouter = useSetCodeRouter();


    return (
        <Base
            name="Set Router"
            inputs={[
                {
                    Input: InputNumber,
                    placeholder: 'newChainId',
                },
                {
                    Input: InputString,
                    placeholder: 'newAdr',
                },
                {
                    Input: InputNumber,
                    placeholder: 'newPoolCodeLength',
                },
            ]}
            code={code}
            method={setCodeRouter}
        >
        </Base>
    );
}
