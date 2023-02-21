import {HTMLAttributes} from 'react';
import {TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse} from 'react-icons/tb';
import {useRecoilState} from 'recoil';
import {sidebarModeState} from 'state/dashboard';

import Menu from './Menu';


type Props = HTMLAttributes<HTMLDivElement>;


export default function Sidebar({className = '', ...attributes}: Props) {
    const [sidebarMode, setSidebarMode] = useRecoilState(sidebarModeState);

    const collapseOrExpand = () => {
        setSidebarMode(sidebarMode === 'expanded' ? 'collapsed' : 'expanded');
    };

    return (
        <div {...attributes} className={(sidebarMode === 'expanded' ? 'flex' : 'hidden') + ' md:flex flex-col w-full h-full md:w-auto md:h-auto left-0 p-2 bg-white shadow-lg shadow-gray-400/30 md:relative ' + className}>
            <button onClick={collapseOrExpand} className="md:flex flex-col hidden text-4xl">
                {sidebarMode === 'expanded' ? <TbLayoutSidebarLeftCollapse
                    className="text-3xl m-[2px] self-end
                        stroke-quicBlueL-300 dark:stroke-quicBlueD-300"/> : <TbLayoutSidebarRightCollapse
                    className="text-3xl m-[2px] self-start
                        stroke-quicBlueL-300 dark:stroke-quicBlueD-300"/>}
            </button>
            <Menu/>
        </div>
    );
}
