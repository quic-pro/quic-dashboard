import {HTMLAttributes} from 'react';
import {TbLayoutSidebarLeftCollapse, TbLayoutSidebarRightCollapse} from 'react-icons/tb';
import {useRecoilState} from 'recoil';

import {sidebarModeState} from '../../../../state/dashboard/layout';
import Menu from './Menu';


type Props = HTMLAttributes<HTMLDivElement>;


export default function Sidebar({className = '', ...attributes}: Props) {
    const [sidebarMode, setSidebarMode] = useRecoilState(sidebarModeState);

    const collapseOrExpand = () => {
        setSidebarMode(sidebarMode === 'expanded' ? 'collapsed' : 'expanded');
    };

    return (
        <div {...attributes} className={'flex flex-col p-2 shadow-lg shadow-gray-400/30 ' + className}>
            <button onClick={collapseOrExpand} className='flex flex-col text-4xl'>
                {sidebarMode === 'expanded' ? <TbLayoutSidebarLeftCollapse
                    className="text-3xl m-[2px] self-end
                        stroke-quicBlueL-300 dark:stroke-quicBlueD-300"/> : <TbLayoutSidebarRightCollapse
                    className="text-3xl m-[2px] self-start
                        stroke-quicBlueL-300 dark:stroke-quicBlueD-300"/>}
            </button>
            <span className='font-bold text-quicBlackL-200 dark:text-quicBlackD-200'>MENU</span>
            <Menu/>
        </div>
    );
}
