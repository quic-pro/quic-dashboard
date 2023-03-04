import logo from 'assets/logo.png';
import {Link} from 'react-router-dom';


type Props = {
    className?: string;
    size?: string;
};


export default function Logo({className = '', size = '48px'}: Props) {
    return (
        <Link to="/" className={'flex flex-row items-center ' + className}>
            <img src={logo} alt="Company`s logo" width={size} height={size}/>
            <span className="ml-2 text-quicBlueL-300 font-bold drop-shadow-lg">QUIC-PRO</span>
        </Link>
    );
}
