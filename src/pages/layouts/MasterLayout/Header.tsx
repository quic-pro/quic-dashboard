import {HTMLAttributes} from 'react';

import {getStyle} from '../../../utils/style';


type Props = HTMLAttributes<HTMLDivElement>;


export default function Header({className, ...attributes}: Props) {
    const style = {
        container: getStyle('min-h-[60px] shadow-lg shadow-gray-400/30', className),
    };

    return (
        <div {...attributes} className={style.container}>

        </div>
    );
}
