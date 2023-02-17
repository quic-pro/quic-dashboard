import {InputProps} from 'components/ui/inputs';
import {ChangeEvent, ReactNode, useState} from 'react';


type Props = {
    name: string;
    inputFields?: InputField[];
    code: number;
    method: (...args: any[]) => void;
    disabled?: boolean;
    children?: ReactNode;
};

export type InputField = Omit<InputProps, 'key' | 'className' | 'onChange'> & {
    InputElement: (props: InputProps) => JSX.Element;
};


export default function Base({name, inputFields, code, method, disabled, children}: Props) {
    const [values, setValues] = useState<string[]>(Array(inputFields?.length ?? 0).fill(''));

    const handleChange = (event: ChangeEvent<HTMLInputElement>, inputIndex: number) => {
        values[inputIndex] = event.target.value;
        setValues(values);
    };

    const handleCall = () => {
        method.apply(null, [code, ...values]);
    };

    return (
        <div className="flex flex-col w-[250px]">
            <button
                disabled={values.includes('') || disabled}
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
                inputFields?.map(({InputElement, ...props}, index) => (
                    <InputElement
                        key={index}
                        {...props}
                        onChange={(event) => handleChange(event, index)}
                        className="my-1"
                    />
                ))
            }
            {children}
        </div>
    );
}
