import {HTMLAttributes} from 'react';


type Props = HTMLAttributes<HTMLDivElement>;


export default function Header({className = '', ...attributes}: Props) {
    return (
        <div {...attributes} className={'min-h-[60px] h-[60px] shadow-lg shadow-gray-400/30 ' + className}>

        </div>
    );
}
