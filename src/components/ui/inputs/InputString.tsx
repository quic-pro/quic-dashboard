import Base, {Props as BaseProps} from './Base';


type Props = Omit<BaseProps, 'type'>;


export default function InputString({...attributes}: Props) {
    return <Base type="text" {...attributes}/>;
}
