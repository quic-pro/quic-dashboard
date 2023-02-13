import {CircularProgress} from '@mui/material';


export default function Loader() {
    return (
        <div className="flex-1 flex flex-col justify-center items-center stroke-quicBlueL-300">
            <CircularProgress/>
        </div>
    );
}
