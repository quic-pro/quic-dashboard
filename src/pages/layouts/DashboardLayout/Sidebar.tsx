import {HTMLAttributes} from 'react';


type Props = HTMLAttributes<HTMLDivElement>;


export default function Sidebar({className = '', ...attributes}: Props) {
    return (
        <nav {...attributes} className={'min-w-[250px] shadow-lg shadow-gray-400/30 ' + className}>
        </nav>
    );
}
