import * as _ from 'lodash';

import * as todoActions from '../actions/todoActions';
import { Todo } from '../types';

interface ITodoUpdateProperties {
    completed?: boolean;
    text?: string;
}

function calculateStateWithUpdatedTodos(
    todos: Todo[],
    matcher: (todo: Todo) => boolean,
    updateProperties: ITodoUpdateProperties,
): Todo[] {
    return todos.map((t) => {
        if (matcher(t)) {
            return _.assign({} as Todo, t, updateProperties);
        }
        return t;
    });
}

function calculateStateWithUpdatedTodo(
    todos: Todo[],
    todoId: number,
    updateProperties: ITodoUpdateProperties,
): Todo[] {
    return calculateStateWithUpdatedTodos(todos, (t: Todo) => t.id === todoId, updateProperties);
}

export function todoReducer(state: Todo[] = [], action: todoActions.ITodoAction<any>): Todo[] {
    switch (action.type) {
        case todoActions.ActionCreators.AddTodo.type:
            const addPayload = action.payload as todoActions.IAddTodoActionPayload;
            return [...state, new Todo(addPayload.id, addPayload.text)];

        case todoActions.ActionCreators.SetTodoCompletion.type:
            const setCompletionPayload = action.payload as todoActions.ISetTodoCompletionActionPayload;
            return calculateStateWithUpdatedTodo(state, setCompletionPayload.id, setCompletionPayload);

        case todoActions.ActionCreators.SetAllTodosCompletion.type:
            const setAllCompletionPayload = action.payload as todoActions.ISetAllTodosCompletionActionPayload;
            return calculateStateWithUpdatedTodos(state,
                                                    (td) => td.completed !== setAllCompletionPayload.completed,
                                                    setAllCompletionPayload);

        case todoActions.SET_TEXT:
            const setTextPayload = (action as todoActions.ISetTodoTextAction).payload;
            return calculateStateWithUpdatedTodo(state, setTextPayload.id, setTextPayload);

        case todoActions.REMOVE:
            const removePayload = (action as todoActions.IRemoveTodoAction).payload;
            return state.filter((td) => td.id !== removePayload.id);

        case todoActions.REMOVE_COMPLETED:
            return state.filter((td) => !td.completed);

        default:
            return state;
    }
}
