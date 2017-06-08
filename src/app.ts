import * as React from 'react';
import { render } from 'react-dom';

import { Provider } from 'react-redux';

import { configureStore, LocalStoragePersister } from './store';

import { TodoApp } from './components/TodoAppComponent';

import 'todomvc-app-css/index.css';

const statePersistence = new LocalStoragePersister();
const initialState = statePersistence.loadPersistedState();
const store = configureStore(initialState);

store.subscribe(() => {
    statePersistence.persistState(store.getState());
});

render(React.createElement(Provider,
                            { store },
                            React.createElement(TodoApp)),
        document.getElementById('todoapp'));
