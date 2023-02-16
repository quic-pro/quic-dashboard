import {DetailedHTMLProps, forwardRef, InputHTMLAttributes} from 'react';


export type Props = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;


export default forwardRef<HTMLInputElement, Props>(function Base({className = '', ...attributes}, ref) {
    attributes.ref = ref;

    return <input {...attributes} className={'rounded-md h-8 my-1 px-2 ' + className}/>;
});
