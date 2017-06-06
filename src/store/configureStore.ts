import { createStore } from 'redux';

import { rootReducer } from '../reducers';
import { IRootState } from '../types/IRootState';

export function configureStore(initialState: IRootState) {
    return createStore(rootReducer, initialState);
}
