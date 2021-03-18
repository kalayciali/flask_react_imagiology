import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history'
import { routerMiddleware } from 'connected-react-router'
import createSagaMiddleware from 'redux-saga';
import { Provider } from "react-redux";
import {
    applyMiddleware, 
    compose, 
    createStore
} from 'redux';

import createRootReducer from './reducers/index'
import rootSaga from './sagas/index';

export const history = createBrowserHistory()

export default function configureStore(preloadedState) {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middleware = [sagaMiddleware, routerMiddleware(history)]
    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composeEnhancers(applyMiddleware(...middleware)),
    );

    sagaMiddleware.run(rootSaga);

    return store
}


