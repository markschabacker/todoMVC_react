import { createStore } from 'redux';

import { IRootState } from '../IRootState';
import { rootReducer } from '../reducers';

export function configureStore(initialState: IRootState) {
    return createStore(rootReducer, initialState);
}
