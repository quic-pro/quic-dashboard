import {HTMLAttributes} from 'react';

import Account from './Account';


type Props = HTMLAttributes<HTMLDivElement>;


export default function Header({className = '', ...attributes}: Props) {
    return (
        <div {...attributes} className={'flex flex-row px-8 justify-end shadow-lg shadow-gray-400/30 ' + className}>
            <div className="flex py-3">
                <Account/>
            </div>
        </div>
    );
}
