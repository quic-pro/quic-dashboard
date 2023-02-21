import {CircularProgress, CircularProgressProps} from '@mui/material';


type Props = CircularProgressProps & {
    className?: string;
};


export default function Loader({className = '', ...attributes}: Props) {
    return (
        <div className={'flex-1 flex flex-col justify-center items-center stroke-quicBlueL-300 ' + className}>
            <CircularProgress {...attributes}/>
        </div>
    );
}
