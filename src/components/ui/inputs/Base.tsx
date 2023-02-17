import {DetailedHTMLProps, InputHTMLAttributes} from 'react';


export type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;


export default function Base({className = '', ...attributes}: Props) {
    return <input {...attributes} className={'rounded-md h-8 px-2 ' + className}/>;
}
