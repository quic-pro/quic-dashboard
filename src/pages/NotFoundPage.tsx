import {useNavigate} from 'react-router-dom';


export default function NotFoundPage() {
    const navigate = useNavigate();

    return (
        <div className="flex-1 flex flex-col justify-center items-center">
            <h1>Error 404 Not Found</h1>
            <button onClick={() => navigate('/')} className="uppercase">Go to home page</button>
            <button onClick={() => navigate(-1)} className="uppercase">Go back</button>
        </div>
    );
}
