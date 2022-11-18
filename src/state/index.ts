import { configureStore } from '@reduxjs/toolkit';
import { load, save } from 'redux-localstorage-simple';


const PERSISTED_KEYS: string[] = [];


const store = configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: true })
        .concat(save({ states: PERSISTED_KEYS, debounce: 1000 })),
    preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: true })
});


export default store;
