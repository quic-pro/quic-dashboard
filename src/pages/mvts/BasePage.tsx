import {ReactNode} from 'react';


type Props = {
    title: string;
    description: string;
    children: ReactNode;
};


export default function BasePage({title, description, children}: Props) {
    return (
        <>
            <h2 className="text-5xl">{title}</h2>
            <p>{description}</p>
            <hr/>
            <div className="mt-4">
                {children}
            </div>
        </>
    );
}
