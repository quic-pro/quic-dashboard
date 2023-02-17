import {DetailedHTMLProps, InputHTMLAttributes} from 'react';


export type BaseProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
export type InputProps = Omit<BaseProps, 'type'>;
