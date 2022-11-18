import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';
import Web3Provider from './components/Web3Provider';
import {Provider} from 'react-redux';
import store from './state';
import App from './App';


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Provider store={store}>
            <Web3Provider>
                <Router>
                    <App/>
                </Router>
            </Web3Provider>
        </Provider>
    </React.StrictMode>
);
