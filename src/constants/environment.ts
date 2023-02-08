import {cleanEnv, str, url} from 'envalid';


const env = cleanEnv(process.env, {
    NODE_ENV: str({choices: ['development', 'test', 'production']}),
    REACT_APP_DOMAIN: url(),
    REACT_APP_INFURA_API_KEY: str(),
});


function defineNodeEnv(): typeof process.env.NODE_ENV {
    if (env.NODE_ENV === 'production') {
        return (window.origin === env.REACT_APP_DOMAIN ? 'production' : 'development');
    }

    return process.env.NODE_ENV;
}


export const NODE_ENV = defineNodeEnv();
export const INFURA_API_KEY = env.REACT_APP_INFURA_API_KEY;
