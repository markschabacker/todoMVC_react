import * as todoActions from '../actions/todoActions';
import { Todo } from '../Todo';
import { todoReducer } from './todoReducer';

const initialTodo: Todo = new Todo(1, 'todo 1', false);
const initialState: Todo[] = [initialTodo];

describe('Add Todo', () => {
    const addTodoInput = { id: 42, text: 'addedTodo ' };
    let nextState: Todo[];

    beforeEach(() => {
        nextState = todoReducer(initialState, todoActions.addTodo(addTodoInput));
    });

    test('Does not modify the state', () => {
        expect(nextState).not.toBe(initialState);
    });

    test('Adds a new todo to the state', () => {
        expect(nextState.length).toEqual(initialState.length + 1);
    });

    test('Adds the expected todo to the state', () => {
        expect(nextState[initialState.length]).toMatchObject(addTodoInput);
    });

    test('Adds a non-completed todo', () => {
        expect(nextState[initialState.length].completed).toBe(false);
    });
});
