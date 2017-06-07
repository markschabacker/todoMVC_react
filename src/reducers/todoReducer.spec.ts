import * as _ from 'lodash';

import { ActionCreators } from '../actions/todoActions';
import { Todo } from '../types';
import { todoReducer } from './todoReducer';

const targetTodo: Todo = new Todo(2, 'todo 2', false);
const targetTodoIndex = 1;
const initialState: Todo[] = [new Todo(1, 'todo 1', true), targetTodo];

describe('Add Todo', () => {
    const addTodoInput = { text: 'addedTodo ' };
    let nextState: Todo[];
    let addedTodo: Todo;

    beforeEach(() => {
        nextState = todoReducer(initialState, ActionCreators.AddTodo.create(addTodoInput));
        addedTodo = nextState[nextState.length - 1];
    });

    test('Does not modify the state', () => {
        expect(nextState).not.toBe(initialState);
    });

    test('Adds a new todo to the state', () => {
        expect(nextState.length).toEqual(initialState.length + 1);
    });

    test('Adds a todo with the expected text to the state', () => {
        expect(addedTodo).toMatchObject(addTodoInput);
    });

    test('Adds a non-completed todo', () => {
        expect(addedTodo.completed).toBe(false);
    });

    test('Adds a todo with a defined id to the state', () => {
        expect(addedTodo.id).toBeDefined();
    });

    test('Adds a todo with a unique id to the state', () => {
        const ids = nextState.map((td) => td.id);
        const distinctIds = _.uniq(ids);

        expect(distinctIds.length).toEqual(ids.length);
    });
});

describe('Set Completion State', () => {
    let nextState: Todo[];
    const completionInput = { id: targetTodo.id, completed: true };

    beforeEach(() => {
        nextState = todoReducer(initialState, ActionCreators.SetTodoCompletion.create(completionInput));
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
        nextState = todoReducer(initialState, ActionCreators.SetAllTodosCompletion.create({ completed }));
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

    test('Modifies todos not set to the target completion state', () => {
        let checkedCount = 0;
        initialState.forEach((initialTodo, i) => {
            if (initialTodo.completed !== completed) {
                const newTodo = nextState[i];

                expect(newTodo).not.toBe(initialTodo);
                expect(newTodo).toMatchObject({ ...initialTodo, completed });
                expect(newTodo.completed).toEqual(completed);

                checkedCount++;
            }
        });
        expect(checkedCount).toBeGreaterThan(0);
    });
});

describe('Set Text', () => {
    let nextState: Todo[];
    const textInput = { id: targetTodo.id, text: 'updated text' };

    beforeEach(() => {
        nextState = todoReducer(initialState, ActionCreators.SetTodoText.create(textInput));
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
        nextState = todoReducer(initialState, ActionCreators.RemoveTodo.create({ id: targetTodo.id }));
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
        nextState = todoReducer(completedInitialState, ActionCreators.RemoveCompletedTodos.create({}));
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
