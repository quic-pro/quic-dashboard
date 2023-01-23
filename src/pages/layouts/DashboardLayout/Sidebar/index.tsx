import {HTMLAttributes, useState} from 'react';
import {TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse} from 'react-icons/tb';

import Menu from './Menu';


type Props = HTMLAttributes<HTMLDivElement>;


export default function Sidebar({className = '', ...attributes}: Props) {
    const [isExpanded, setIsExpanded] = useState(true);

    const collapseOrExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div {...attributes} className={'flex flex-col p-2 shadow-lg shadow-gray-400/30 ' + className}>
            <button onClick={collapseOrExpand} className="flex flex-col text-4xl items-end">
                {isExpanded ? <TbLayoutSidebarLeftCollapse/> : <TbLayoutSidebarRightCollapse/>}
            </button>
            <span>MENU</span>
            <Menu isSidebarExpanded={isExpanded}/>
        </div>
    );
}
