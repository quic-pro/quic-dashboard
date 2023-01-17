import {cleanEnv, str, url} from 'envalid';


const env = cleanEnv(process.env, {
    NODE_ENV: str({choices: ['development', 'test', 'production']}),
    REACT_APP_DOMAIN: url(),
    REACT_APP_INFURA_API_KEY: str(),
});


export const NODE_ENV = (window.origin === env.REACT_APP_DOMAIN ? 'production' : process.env.NODE_ENV);
export const INFURA_API_KEY = env.REACT_APP_INFURA_API_KEY;
