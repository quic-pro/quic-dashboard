import {HTMLAttributes} from 'react';
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';
import {useRecoilState} from 'recoil';
import {sidebarModeState} from 'state/dashboard';

import Sidebar from '../Sidebar';
import Account from './Account';


type Props = HTMLAttributes<HTMLDivElement>;


export default function Header({className = '', ...attributes}: Props) {
    const [sidebarMode, setSidebarMode] = useRecoilState(sidebarModeState);

    const collapseOrExpand = () => {
        setSidebarMode(sidebarMode === 'expanded' ? 'collapsed' : 'expanded');
    };

    return (
        <div {...attributes} className={'flex flex-row py-2 sm:py-3 shadow-lg shadow-gray-400/30 ' + className}>
            <div className="container flex flex-row justify-between">
                <div>
                    <button onClick={collapseOrExpand} className="flex flex-col md:hidden text-4xl">
                        {sidebarMode === 'expanded'
                            ? <AiOutlineClose
                                className="text-2xl m-[2px] self-end stroke-quicBlueL-300 dark:stroke-quicBlueD-300"/>
                            : <AiOutlineMenu
                                className="text-2xl m-[2px] self-start stroke-quicBlueL-300 dark:stroke-quicBlueD-300"/>}
                    </button>
                    <Sidebar className="flex md:hidden absolute"/>
                </div>
                <div className="flex">
                    <Account/>
                </div>
            </div>
        </div>
    );
}
