import { ActionCreator, Todo } from '../types';

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

export interface ISetTodoTextActionPayload {
    id: number;
    text: string;
}

export interface IRemoveTodoActionPayload {
    id: number;
}

export interface IRemoveCompletedTodosAction extends ITodoAction<{}> { }

export function removeCompleted(): IRemoveCompletedTodosAction {
    return { type: REMOVE_COMPLETED, payload: {} };
}

export const ActionCreators = {
    AddTodo: new ActionCreator<'AddTodo', IAddTodoActionPayload>('AddTodo'),
    RemoveTodo: new ActionCreator<'RemoveTodo', IRemoveTodoActionPayload>('RemoveTodo'),
    SetAllTodosCompletion: new ActionCreator<'SetAllTodosCompletion', ISetAllTodosCompletionActionPayload>(
        'SetAllTodosCompletion',
    ),
    SetTodoCompletion: new ActionCreator<'SetTodoCompletion', ISetTodoCompletionActionPayload>('SetTodoCompletion'),
    SetTodoText: new ActionCreator<'SetTodoText', ISetTodoTextActionPayload>('SetTodoText'),
};
