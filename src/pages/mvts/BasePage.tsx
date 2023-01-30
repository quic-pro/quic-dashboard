import {ReactNode} from 'react';


type Props = {
    title: string;
    description: string;
    children: ReactNode;
};


export default function BasePage({title, description, children}: Props) {
    return (
        <>
            <h2 className="text-4xl uppercase font-bold text-quicBlackL-200 dark:quicBlackD-200">{title}</h2>
            <p className='text-quicBlackL dark:text-quicBlackD'>{description}</p>
            <hr/>
            <div className="mt-4">
                {children}
            </div>
        </>
    );
}
