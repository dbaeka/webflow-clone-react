import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import {createInjectorsEnhancer, forceReducerReload} from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import logger from 'redux-logger';
import {
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER
} from "redux-persist";
import createReducer from './reducers';


export default function configureAppStore(initialState = {}) {
    const reduxSagaMonitorOptions = {};
    const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
    const {run: runSaga} = sagaMiddleware;

    // sagaMiddleware: Makes redux-sagas work
    const middlewares = [sagaMiddleware, logger];

    const enhancers = [
        createInjectorsEnhancer({
            createReducer,
            runSaga,
        }),
    ];

    const store = configureStore({
        reducer: createReducer(),
        middleware: [...getDefaultMiddleware({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER] // non-serializable fix
                }
            }
        ), ...middlewares],
        preloadedState: initialState,
        devTools: process.env.NODE_ENV !== 'production',
        enhancers,
    });

    const persistor = persistStore(store);

    // Make reducers hot reloadable, see http://mxs.is/googmo
    /* istanbul ignore next */
    if (module.hot) {
        module.hot.accept('./reducers', () => {
            forceReducerReload(store);
        });
    }

    return {store, persistor};
}