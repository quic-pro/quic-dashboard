import Base from './Base';
import {InputProps} from './types';


export default function InputNumber(props: InputProps) {
    return <Base type="number" {...props}/>;
}
