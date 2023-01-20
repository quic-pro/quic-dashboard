import {MouseEvent, ReactElement, useEffect, useState} from 'react';
import {RxCaretDown, RxCaretUp} from 'react-icons/rx';


type Props = {
    children: [ReactElement, ReactElement];
};


export default function DropDown({children: [button, content]}: Props) {
    const [isExpanded, setIsExpanded] = useState(false);

    useEffect(() => {

        const onClick = () => setIsExpanded(false);
        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, []);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation();
        setIsExpanded(!isExpanded);
    };

    return (
        <div className="flex flex-col">
            <button onClick={handleClick} className="flex">
                {button} {isExpanded ? <RxCaretUp className="text-2xl"/> : <RxCaretDown className="text-2xl"/>}
            </button>
            <div className="relative">
                <div className="absolute left-0 top-0">
                    {isExpanded && content}
                </div>
            </div>
        </div>
    );
}
