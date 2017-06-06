import * as _ from 'lodash';

import * as todoActions from '../actions/todoActions';
import { Todo } from '../Todo';

interface ITodoUpdateProperties {
    completed?: boolean;
    text?: string;
}

function updateTodos(todos: Todo[], matcher: (todo: Todo) => boolean, updateProperties: ITodoUpdateProperties): Todo[] {
    return todos.map((t) => {
        if (matcher(t)) {
            return _.assign({} as Todo, t, updateProperties);
        }
        return t;
    });
}

function updateTodo(todos: Todo[], todoId: number, updateProperties: ITodoUpdateProperties): Todo[] {
    return updateTodos(todos, (t: Todo) => t.id === todoId, updateProperties);
}

export function todoReducer(state: Todo[] = [], action: todoActions.ITodoAction<any>): Todo[] {

    switch (action.type) {
        case todoActions.ADD_TODO:
            const addPayload = (action as todoActions.IAddTodoAction).payload;
            return [...state, new Todo(addPayload.id, addPayload.text)];

        case todoActions.SET_COMPLETION:
            const setCompletionPayload = (action as todoActions.ISetTodoCompletionAction).payload;
            return updateTodo(state, setCompletionPayload.id, setCompletionPayload);

        case todoActions.SET_TEXT:
            const setTextPayload = (action as todoActions.ISetTodoCompletionAction).payload;
            return updateTodo(state, setTextPayload.id, setTextPayload);

        default:
            return state;
    }
}