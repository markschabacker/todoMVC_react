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

export interface IAddTodoAction extends ITodoAction<{ todo: Todo }> { }

export function addTodo(todo: Todo): IAddTodoAction {
    return { type: ADD_TODO, payload: { todo }};
}

export interface ISetTodoCompletionAction extends ITodoAction<{ todo: { id: number, completed: boolean }}> {}

export function setTodoCompletion(todo: { id: number, completed: boolean}): ISetTodoCompletionAction {
    return { type: SET_COMPLETION, payload: { todo }};
}

export interface IUpdateTodoTextAction extends ITodoAction<{ todo: { id: number, text: string }}> {}

export function updateTodoText(todo: { id: number, text: string}): IUpdateTodoTextAction {
    return { type: SET_TEXT, payload: { todo }};
}

export interface IRemoveTodoAction extends ITodoAction<{ todo: { id: number }}> {}

export function removeTodo(id: number): IRemoveTodoAction {
    return { type: REMOVE, payload: { todo: { id }}};
}

export interface IRemoveCompletedTodosAction extends ITodoAction<{}> {}

export function removeCompleted(): IRemoveCompletedTodosAction {
    return { type: REMOVE_COMPLETED, payload: {}};
}
