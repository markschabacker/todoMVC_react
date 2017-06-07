import { ActionCreator, Todo } from '../types';

export let SET_ALL_COMPLETION: string = 'SET_ALL_COMPLETION';
export let SET_TEXT: string = 'SET_TEXT';
export let REMOVE: string = 'REMOVE';
export let REMOVE_COMPLETED: string = 'REMOVE_COMPLETED';

export interface ITodoAction<T> {
    type: string;
    payload: T;
}

export interface IAddTodoActionPayload {
    id: number;
    text: string;
}

export interface ISetTodoCompletionActionPayload {
    id: number;
    completed: boolean;
}

export interface ISetAllTodosCompletionActionPayload {
    completed: boolean;
 }

export interface ISetTodoTextAction extends ITodoAction<{ id: number, text: string }> { }

export function setTodoText(todo: { id: number, text: string }): ISetTodoTextAction {
    return { type: SET_TEXT, payload: todo };
}

export interface IRemoveTodoAction extends ITodoAction<{ id: number }> { }

export function removeTodo(id: number): IRemoveTodoAction {
    return { type: REMOVE, payload: { id } };
}

export interface IRemoveCompletedTodosAction extends ITodoAction<{}> { }

export function removeCompleted(): IRemoveCompletedTodosAction {
    return { type: REMOVE_COMPLETED, payload: {} };
}

export const ActionCreators = {
    AddTodo: new ActionCreator<'AddTodo', IAddTodoActionPayload>('AddTodo'),
    SetAllTodosCompletion: new ActionCreator<'SetAllTodosCompletion', ISetAllTodosCompletionActionPayload>(
        'SetAllTodosCompletion',
    ),
    SetTodoCompletion: new ActionCreator<'SetTodoCompletion', ISetTodoCompletionActionPayload>('SetTodoCompletion'),
};
