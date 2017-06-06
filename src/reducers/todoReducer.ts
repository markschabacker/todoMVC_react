import { Todo } from '../Todo';

import * as todoActions from '../actions/todoActions';

export function todoReducer(state: Todo[] = [], action: todoActions.ITodoAction<any>): Todo[] {
    switch (action.type) {
        case todoActions.ADD_TODO:
            const payload = (action as todoActions.IAddTodoAction).payload;
            return [...state, new Todo(payload.id, payload.text)];

        default:
            return state;
    }
}
