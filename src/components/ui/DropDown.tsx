import {ReactElement, useEffect, useState} from 'react';
import {RxCaretDown, RxCaretUp} from 'react-icons/rx';


type Props = {
    children: [ReactElement, ReactElement];
};


export default function DropDown({children: [button, content]}: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [buttonHasBeenPressed, setButtonHasBeenPressed] = useState(false);

    useEffect(() => {
        const onClick = () => {
            if (isExpanded && !buttonHasBeenPressed) {
                setIsExpanded(!isExpanded);
            } else {
                setButtonHasBeenPressed(false);
            }
        };

        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, [isExpanded, buttonHasBeenPressed]);

    const handleClick = () => {
        setIsExpanded(!isExpanded);
        setButtonHasBeenPressed(true);
    };

    return (
        <div className="flex flex-col">
            <button onClick={handleClick} className="flex">
                {button} {isExpanded ? <RxCaretUp className="text-2xl"/> : <RxCaretDown className="text-2xl"/>}
            </button>
            <div className="relative">
                <div className="absolute top-2 w-[280px]">
                    {isExpanded && content}
                </div>
            </div>
        </div>
    );
}
