import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import storage from './store';
import ListOfThemes from './components/ListOfThemes';
import ListOfArticles from './containers/ListOfArticles';
import UndoRedo from './containers/UndoRedo';

const { store, persistor } = storage();

const App = () => (
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ListOfThemes />
            <ListOfArticles />
            <UndoRedo />
        </PersistGate>
    </Provider>
);

export default App;
