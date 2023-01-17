import {HTMLAttributes} from 'react';

import {getStyle} from '../../utils/style';
import Connectors from './Connectors';


type Props = HTMLAttributes<HTMLDivElement>;


export default function ConnectWallet({className, ...attributes}: Props) {
    const style = {
        container: getStyle('flex flex-col p-5 rounded-lg shadow-lg shadow-gray-400/30 bg-white', className),
        headerText: 'text-[27px] mb-3 font-Comfort text-center',
    };

    return (
        <div {...attributes} className={style.container}>
            <span className={style.headerText}>Connect wallet</span>
            <Connectors/>
        </div>
    );
}
