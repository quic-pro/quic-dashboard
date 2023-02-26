import {Link} from 'react-router-dom';


const MENU = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'MVTS',
        path: '/mvts-demo',
        isNew: true,
    },
];


export default function Navbar() {
    return (
        <nav className="flex flex-row items-center">
            {MENU.map(({name, path, isNew}) => (
                <Link key={name} to={path} className="flex flex-row mx-2 px-2 py-1 border border-quicBlueL-300 rounded-xl">
                    {name}
                    {isNew && <span className="my-auto ml-1 px-1 border rounded-full bg-quicBlueD-300 text-xs">NEW</span>}
                </Link>
            ))}
        </nav>
    );
}
