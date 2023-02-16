import {forwardRef} from 'react';

import Base, {Props as BaseProps} from './Base';


type Props = Omit<BaseProps, 'type'>;


export default forwardRef<HTMLInputElement, Props>(function InputNumber({...attributes}, ref) {
    attributes.ref = ref;

    // @ts-ignore
    return <Base type="number" {...attributes}/>;
});
