import {ReactNode} from 'react';


type Props = {
    children?: ReactNode;
    name: string;
    disabled?: boolean;
    handleCall: () => void;
};


export default function Base({children, name, disabled, handleCall}: Props) {
    return (
        <div className="flex flex-col w-[250px]">
            {children}
            <button
                disabled={disabled}
                onClick={handleCall}
                className={
                    'border rounded-md h-8 my-1 disabled:opacity-50 ' +
                    'border-quicBlueL-400 bg-quicBlueL-400 text-white ' +
                    'enabled:hover:bg-white enabled:hover:text-quicBlueL-400 ' +
                    'dark:border-quicBlueD-400 dark:bg-quicBlueD-400 dark:text-white ' +
                    'dark:enabled:hover:bg-white dark:enabled:hover:text-quicBlueD-400'
                }
            >
                {name}
            </button>
        </div>
    );
}
