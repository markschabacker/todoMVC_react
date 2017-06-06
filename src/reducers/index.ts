import { combineReducers } from 'redux';

import { todoReducer } from './todoReducer';

import { IRootState } from '../types';

export const rootReducer = combineReducers<IRootState>({
    todos: todoReducer,
});
