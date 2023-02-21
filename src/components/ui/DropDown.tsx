import {ReactElement, useEffect, useState} from 'react';
import {RxCaretDown, RxCaretUp} from 'react-icons/rx';


type Props = {
    mode: 'list' | 'details';
    children: [ReactElement, ReactElement];
};


export default function DropDown({mode, children: [button, content]}: Props) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [hasBeenPressed, setHasBeenPressed] = useState(false);

    useEffect(() => {
        const onClick = () => {
            if (isExpanded && !hasBeenPressed) {
                setIsExpanded(!isExpanded);
            } else {
                setHasBeenPressed(false);
            }
        };

        window.addEventListener('click', onClick);
        return () => window.removeEventListener('click', onClick);
    }, [isExpanded, hasBeenPressed]);

    const handleButtonClick = () => {
        setIsExpanded(!isExpanded);
        setHasBeenPressed(true);
    };

    const handleContextClick = () => {
        if (mode !== 'list') {
            setHasBeenPressed(true);
        }
    };

    return (
        <div className="flex flex-col">
            <button onClick={handleButtonClick} className="flex">
                {button} {isExpanded ? <RxCaretUp className="text-2xl"/> : <RxCaretDown className="text-2xl"/>}
            </button>
            <div className="relative">
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
                <div onClick={handleContextClick} className="absolute top-2 right-0">
                    {isExpanded && content}
                </div>
            </div>
        </div>
    );
}
