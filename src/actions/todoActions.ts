import { Todo } from '../Todo';

export let ADD_TODO: string = 'ADD_TODO';
export let SET_COMPLETION: string = 'SET_COMPLETION';
export let SET_TEXT: string = 'SET_TEXT';
export let REMOVE: string = 'REMOVE';
export let REMOVE_COMPLETED: string = 'REMOVE_COMPLETED';

export interface ITodoAction<T> {
    type: string;
    payload: T;
}

export interface IAddTodoAction extends ITodoAction<{ id: number, text: string }> { }

export function addTodo(todo: { id: number, text: string }): IAddTodoAction {
    return { type: ADD_TODO, payload: todo };
}

export interface ISetTodoCompletionAction extends ITodoAction<{ id: number, completed: boolean }> { }

export function setTodoCompletion(todo: { id: number, completed: boolean }): ISetTodoCompletionAction {
    return { type: SET_COMPLETION, payload: todo };
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
