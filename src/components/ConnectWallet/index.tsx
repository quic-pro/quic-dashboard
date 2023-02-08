import {HTMLAttributes} from 'react';

import Connectors from './Connectors';


type Props = HTMLAttributes<HTMLDivElement>;


export default function ConnectWallet({className = '', ...attributes}: Props) {
    return (
        <div {...attributes} className={'w-full flex flex-col ' + className}>
            <span className="text-2xl mb-3 font-Comfort text-center">Connect wallet</span>
            <Connectors/>
        </div>
    );
}
