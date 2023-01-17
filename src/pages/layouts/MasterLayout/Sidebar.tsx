import {HTMLAttributes} from 'react';

import {getStyle} from '../../../utils/style';


type Props = HTMLAttributes<HTMLDivElement>;


export default function Sidebar({className, ...attributes}: Props) {
    const style = {
        container: getStyle('min-w-[250px] shadow-lg shadow-gray-400/30', className),
    };

    return (
        <nav {...attributes} className={style.container}>
            dgdfg
        </nav>
    );
}
