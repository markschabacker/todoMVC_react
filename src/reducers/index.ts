import { combineReducers } from 'redux';

import { todoReducer } from './todoReducer';

import { IRootState } from '../IRootState';

export const rootReducer = combineReducers<IRootState>({
    todos: todoReducer,
});
