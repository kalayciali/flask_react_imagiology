import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import {
    applyMiddleware, 
    compose, 
    createStore
} from 'redux';

import rootReducer from './reducers/index';
import rootSaga from './sagas/index';
import createSagaMiddleware from 'redux-saga';

export function configureStore() {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const middleware = [sagaMiddleware, ]
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(...middleware)),
    );

    sagaMiddleware.run(rootSaga);

    return store
}


