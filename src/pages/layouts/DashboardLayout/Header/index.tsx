import {HTMLAttributes} from 'react';

import Account from './Account';


type Props = HTMLAttributes<HTMLDivElement>;


export default function Header({className = '', ...attributes}: Props) {
    return (
        <div {...attributes} className={'flex shadow-lg shadow-gray-400/30 ' + className}>
            <div className="container flex py-3 justify-end">
                <Account/>
            </div>
        </div>
    );
}
