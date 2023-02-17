import {ChangeEvent, DetailedHTMLProps, InputHTMLAttributes, ReactNode, useState} from 'react';


type Props = {
    children?: ReactNode;
    name: string;
    inputs?: {
        Input: (props: Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'type'>) => JSX.Element;
        placeholder: string;
    }[];
    code: number;
    method: (...args: any[]) => void;
};


export default function Base({children, name, inputs, code, method}: Props) {
    const [isDisabled, setIsDisabled] = useState(!!inputs?.length);
    const [values, setValues] = useState<string[]>(Array(inputs?.length ?? 0).fill(''));

    const handleChange = (event: ChangeEvent<HTMLInputElement>, index: number) => {
        values[index] = event.target.value;
        setValues(values);

        let newSetIsDisabled = false;
        for (let i = 0; i < values.length; ++i) {
            if (values[i].length === 0) {
                newSetIsDisabled = true;
                break;
            }
        }
        setIsDisabled(newSetIsDisabled);
    };

    const handleCall = () => {
        method.apply(null, [code, ...values]);
    };


    return (
        <div className="flex flex-col w-[250px]">
            <button
                disabled={isDisabled}
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
            {
                inputs?.map(({Input, placeholder}, index) => (
                    <Input
                        key={placeholder}
                        placeholder={placeholder}
                        onChange={(event) => handleChange(event, index)}
                        className="my-1"
                    />
                ))
            }
            {children}
        </div>
    );
}
