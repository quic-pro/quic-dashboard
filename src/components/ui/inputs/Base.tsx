import {BaseProps} from './types';


export default function Base({className = '', ...attributes}: BaseProps) {
    return <input {...attributes} className={'rounded-md h-8 px-2 ' + className}/>;
}
