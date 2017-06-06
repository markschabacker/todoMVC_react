import * as todoActions from '../actions/todoActions';
import { Todo } from '../Todo';
import { todoReducer } from './todoReducer';

const targetTodo: Todo = new Todo(2, 'todo 2', false);
const targetTodoIndex = 1;
const initialState: Todo[] = [new Todo(1, 'todo 1'), targetTodo];

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

describe('Set Completion State', () => {
    let nextState: Todo[];
    const completionInput = { id: targetTodo.id, completed: true };

    beforeEach(() => {
        nextState = todoReducer(initialState, todoActions.setTodoCompletion(completionInput));
    });

    test('Does not modify the state', () => {
        expect(nextState).not.toBe(initialState);
    });

    test('Does not modify other todos', () => {
        nextState.forEach((td, i) => {
            if (i !== targetTodoIndex) {
                expect(nextState[i]).toBe(initialState[i]);
            }
        });
    });

    test('Sets the completion state on the expected todo', () => {
        const updatedTodo = nextState.filter((td) => td.id === targetTodo.id)[0];
        expect(updatedTodo).not.toBe(targetTodo);
        expect(updatedTodo).toMatchObject(completionInput);
    });
});

describe('Set Text', () => {
    let nextState: Todo[];
    const textInput = { id: targetTodo.id, text: 'updated text' };

    beforeEach(() => {
        nextState = todoReducer(initialState, todoActions.setTodoText(textInput));
    });

    test('Does not modify the state', () => {
        expect(nextState).not.toBe(initialState);
    });

    test('Does not modify other todos', () => {
        nextState.forEach((td, i) => {
            if (i !== targetTodoIndex) {
                expect(nextState[i]).toBe(initialState[i]);
            }
        });
    });

    test('Sets the text on the expected todo', () => {
        const updatedTodo = nextState.filter((td) => td.id === targetTodo.id)[0];
        expect(updatedTodo).not.toBe(targetTodo);
        expect(updatedTodo).toMatchObject(textInput);
    });
});
