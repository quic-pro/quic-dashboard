import ReactDOM from 'react-dom/client';

import App from './App';
import {NODE_ENV} from './constants/environment';
import {reportWebVitals} from './reportWebVitals';


const rootHtmlElement = document.getElementById('root');
if (!rootHtmlElement) {
    throw new Error('Failed to find the root element');
}


ReactDOM.createRoot(rootHtmlElement).render(<App/>);

if (NODE_ENV !== 'production') {
    reportWebVitals(console.info);
}
