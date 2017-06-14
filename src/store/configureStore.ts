import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer } from '../reducers';
import { IRootState } from '../types/IRootState';

export function configureStore(initialState: IRootState) {
    const middlewares = [ thunk ];
    return createStore(rootReducer, initialState, applyMiddleware(...middlewares));
}
