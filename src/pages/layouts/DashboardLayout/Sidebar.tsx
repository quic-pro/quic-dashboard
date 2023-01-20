import {HTMLAttributes, useState} from 'react';
import {TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse} from 'react-icons/tb';


type Props = HTMLAttributes<HTMLDivElement>;


export default function Sidebar({className = '', ...attributes}: Props) {
    const [isExpanded, setIsExpanded] = useState(true);

    /* const menu = [
        {
            name: 'Main',
            icon: null,
        },
        {
            name: 'Finance',
            icon: null,
        },
        {
            name: 'Shop',
            icon: null,
            items: [
                {
                    name: 'Numbers',
                },
            ],
        },
    ];*/

    const collapseOrExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div {...attributes} className={'min-w-[250px] shadow-lg shadow-gray-400/30 ' + className}>
            <button onClick={collapseOrExpand} className="text-4xl float-right">
                {isExpanded ? <TbLayoutSidebarRightCollapse/> : <TbLayoutSidebarLeftCollapse/>}
            </button>
            <nav>
            </nav>
        </div>
    );
}
