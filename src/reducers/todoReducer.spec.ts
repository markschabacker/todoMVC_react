import * as _ from 'lodash';

import * as todoActions from '../actions/todoActions';
import { Todo } from '../types';
import { todoReducer } from './todoReducer';

const targetTodo: Todo = new Todo(2, 'todo 2', false);
const targetTodoIndex = 1;
const initialState: Todo[] = [new Todo(1, 'todo 1'), targetTodo];

describe('Add Todo', () => {
    const addTodoInput = { id: 42, text: 'addedTodo ' };
    let nextState: Todo[];

    beforeEach(() => {
        nextState = todoReducer(initialState, todoActions.ActionCreators.AddTodo.create(addTodoInput));
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

describe('Set All Completion State', () => {
    let nextState: Todo[];
    const completed = false;

    beforeEach(() => {
        nextState = todoReducer(initialState, todoActions.setAllTodosCompletion(completed));
    });

    test('Does not modify the state', () => {
        expect(nextState).not.toBe(initialState);
    });

    test('Does not change the length of the todos', () => {
        expect(nextState.length).toEqual(initialState.length);
    });

    test('Does not modify todos already set to the target completion state', () => {
        initialState.forEach((initialTodo, i) => {
            if (initialTodo.completed === completed) {
                expect(nextState[i]).toBe(initialTodo);
            }
        });
    });

    test('Modfiesy todos not set to the target completion state', () => {
        initialState.forEach((initialTodo, i) => {
            if (initialTodo.completed !== completed) {
                const newTodo = nextState[i];

                expect(newTodo).not.toBe(initialTodo);
                expect(newTodo).toMatchObject(_.assign({} as Todo, initialTodo, { completed }));
                expect(newTodo.completed).toEqual(completed);
            }
        });
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

describe('Remove Todo', () => {
    let nextState: Todo[];

    beforeEach(() => {
        nextState = todoReducer(initialState, todoActions.removeTodo(targetTodo.id));
    });

    test('Does not modify the state', () => {
        expect(nextState).not.toBe(initialState);
    });

    it('Removes a todo', () => {
        expect(nextState.length).toEqual(initialState.length - 1);
    });

    it('Removes the expected todo', () => {
        const matchingCount = nextState.filter((td) => td.id === targetTodo.id).length;
        expect(matchingCount).toEqual(0);
    });
});

describe('Remove Completed', () => {
    const completedInitialState = [
        new Todo(1, '1', true),
        new Todo(2, '2', false),
        new Todo(3, '3', true),
    ];
    const completedCount = completedInitialState.filter((td) => td.completed).length;

    let nextState: Todo[];

    beforeEach(() => {
        nextState = todoReducer(completedInitialState, todoActions.removeCompleted());
    });

    test('Does not modify the state', () => {
        expect(nextState).not.toBe(completedInitialState);
    });

    it('Removes completed todos', () => {
        expect(nextState.length).toEqual(completedInitialState.length - completedCount);
    });

    it('Leaves non-completed TODOs', () => {
        const remainingCompletedCount = nextState.filter((td) => td.completed).length;
        expect(remainingCompletedCount).toEqual(0);
    });
});
