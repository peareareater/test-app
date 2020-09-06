import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import reducers from './reducers';
import middleware, { sagaMiddleware } from './middleware';
import rootSaga from './sagas';

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
    const store = createStore(persistedReducer, applyMiddleware(...middleware));
    sagaMiddleware.run(rootSaga);
    const persistor = persistStore(store);
    return { store, persistor }
};

