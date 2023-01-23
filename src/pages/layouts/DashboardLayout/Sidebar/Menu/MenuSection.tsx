import {useState} from 'react';
import {RxCaretDown, RxCaretUp} from 'react-icons/rx';
import {NavLink} from 'react-router-dom';

import {MenuSectionData} from '../../../../../constants/dashboard/sidebar';


type Props = {
    data: MenuSectionData;
    isSidebarExpanded: boolean;
};


export default function MenuSection({data, isSidebarExpanded}: Props) {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    };

    if (data.link) {
        return (
            <div className="py-1 ">
                <NavLink to={`${data.link}`} className="flex flex-row items-center">
                    <data.icon className="text-4xl"/>
                    {isSidebarExpanded && <span className="ml-2 text-lg">{data.name}</span>}
                </NavLink>
            </div>
        );
    }

    return (
        <div className="py-1 flex flex-col">
            <button onClick={handleClick} className="flex flex-row items-center justify-between">
                <div className="flex flex-row">
                    <data.icon className="text-4xl"/>
                    {isSidebarExpanded && <span className="ml-2 text-lg">{data.name}</span>}
                </div>
                {isExpanded ? <RxCaretUp className="text-3xl"/> : <RxCaretDown className="text-3xl"/>}
            </button>
            {isExpanded && <div className="flex flex-col pl-11">
                {data.pages?.map((sectionPage) => <NavLink key={sectionPage.name}
                    to={`${sectionPage.link}`}
                    className="text-lg">{sectionPage.name}</NavLink>)}
            </div>}
        </div>
    );
}
