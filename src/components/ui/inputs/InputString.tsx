import Base from './Base';
import {InputProps} from './types';


export default function InputString(props: InputProps) {
    return <Base type="text" {...props}/>;
}
