export const isDevelopment = (process.env.NODE_ENV === 'development');
export const isProduction = (process.env.NODE_ENV === 'production');

export const isTestNetwork = isDevelopment || (process.env.REACT_APP_IS_TEST_NETWORK === 'true');
