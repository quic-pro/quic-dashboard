import {AtomEffect, DefaultValue} from 'recoil';


export function localStorageEffect<T>(key: string): AtomEffect<T> {
    return ({setSelf, onSet}) => {
        const savedValue = localStorage.getItem(key);
        if (savedValue !== null) {
            const value = JSON.parse(savedValue);
            setSelf(value instanceof DefaultValue ? value : new DefaultValue());
        }

        onSet((newValue: T) => {
            localStorage.setItem(key, JSON.stringify(newValue));
        });
    };
}
