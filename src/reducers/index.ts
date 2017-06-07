import { combineReducers } from 'redux';

import { fetchingReducer } from './fetchingReducer';
import { todoReducer } from './todoReducer';

import { IRootState } from '../types';

export const rootReducer = combineReducers<IRootState>({
    fetching: fetchingReducer,
    todos: todoReducer,
});
