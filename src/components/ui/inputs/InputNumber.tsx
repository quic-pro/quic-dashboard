import Base, {Props as BaseProps} from './Base';


type Props = Omit<BaseProps, 'type'>;


export default function InputNumber({...attributes}: Props) {
    return <Base type="number" {...attributes}/>;
}
