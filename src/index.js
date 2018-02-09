import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Routes from './routes';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux'
import reducer from './reducers';
import { logger } from 'redux-logger'
import Thunk from 'redux-thunk';
// import registerServiceWorker from './registerServiceWorker';

const createStoreWithMiddleware = applyMiddleware(Thunk, logger)(createStore);

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducer)}>
        <Routes />
    </Provider>,
    document.getElementById('root'));
// registerServiceWorker();
