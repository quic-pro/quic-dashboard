import {HTMLAttributes} from 'react';

import Connectors from './Connectors';


type Props = HTMLAttributes<HTMLDivElement>;


export default function ConnectWallet({className = '', ...attributes}: Props) {
    return (
        <div {...attributes} className={'w-full flex flex-col ' + className}>
            <span className="text-2xl font-Comfort text-center">Connect wallet</span>
            <span className="mb-3 font-Comfort text-center italic">Choose a wallet to connect instead of creating passwords for every website.</span>
            <Connectors/>
            <a href="https://ethereum.org/en/wallets/" target="_blank" rel="noreferrer" className="mt-3 text-xs uppercase font-Comfort text-center text-quicBlueL-400 underline">I don&apos;t know what it is</a>
        </div>
    );
}
