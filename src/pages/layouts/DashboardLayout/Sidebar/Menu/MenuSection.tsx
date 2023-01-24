import {useState} from 'react';
import {RxCaretDown, RxCaretUp} from 'react-icons/rx';
import {NavLink} from 'react-router-dom';
import {useRecoilState} from 'recoil';

import {MenuSectionData} from '../../../../../constants/dashboard/sidebar';
import {sidebarModeState} from '../../../../../state/dashboard/layout';


type Props = {
    data: MenuSectionData;
};


export default function MenuSection({data}: Props) {
    const [sidebarMode, setSidebarMode] = useRecoilState(sidebarModeState);
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        if (sidebarMode === 'collapsed') {
            setSidebarMode('expanded');
            if (!isExpanded) {
                setIsExpanded(!isExpanded);
            }
        } else {
            setIsExpanded(!isExpanded);
        }
    };

    if (!data.pages) {
        return (
            <div className="py-1 ">
                <NavLink to={`${data.link ?? '/404'}`} className="flex flex-row items-center">
                    <data.icon className="text-4xl"/>
                    {(sidebarMode === 'expanded') && <span className="ml-2 text-lg">{data.name}</span>}
                </NavLink>
            </div>
        );
    }

    return (
        <div className="py-1 flex flex-col">
            <button onClick={handleClick} className="flex flex-row items-center justify-between">
                <div className="flex flex-row">
                    <data.icon className="text-4xl"/>
                    {(sidebarMode === 'expanded') && <span className="ml-2 text-lg">{data.name}</span>}
                </div>
                {isExpanded ? <RxCaretUp className="text-3xl"/> : <RxCaretDown className="text-3xl"/>}
            </button>
            {(sidebarMode === 'expanded') && isExpanded && <div className="flex flex-col pl-11">
                {data.pages?.map((sectionPage) => <NavLink key={sectionPage.name}
                    to={`${sectionPage.link}`}
                    className="text-lg">{sectionPage.name}</NavLink>)}
            </div>}
        </div>
    );
}
