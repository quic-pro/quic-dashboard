import {Link} from 'react-router-dom';


export default function Navbar() {
    return (
        <nav className="flex flex-row items-center">
            <Link to="/mvts-demo" className="flex flex-row px-2 py-1 border border-quicBlueL-300 rounded-xl">
                MVTS
                <span className="my-auto ml-1 px-1 border rounded-full bg-quicBlueD-300 text-xs">NEW</span>
            </Link>
        </nav>
    );
}
