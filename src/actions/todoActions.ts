import { ActionCreator, Todo } from '../types';

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

export interface IRemoveCompletedTodosActionPayload {
}

export const ActionCreators = {
    AddTodo: new ActionCreator<'AddTodo', IAddTodoActionPayload>('AddTodo'),
    RemoveCompletedTodos: new ActionCreator<'RemoveCompletedTodos', IRemoveCompletedTodosActionPayload>(
        'RemoveCompletedTodos',
    ),
    RemoveTodo: new ActionCreator<'RemoveTodo', IRemoveTodoActionPayload>('RemoveTodo'),
    SetAllTodosCompletion: new ActionCreator<'SetAllTodosCompletion', ISetAllTodosCompletionActionPayload>(
        'SetAllTodosCompletion',
    ),
    SetTodoCompletion: new ActionCreator<'SetTodoCompletion', ISetTodoCompletionActionPayload>('SetTodoCompletion'),
    SetTodoText: new ActionCreator<'SetTodoText', ISetTodoTextActionPayload>('SetTodoText'),
};
