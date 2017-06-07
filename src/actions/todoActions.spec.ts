import * as todoActions from './todoActions';

describe('Todo Actions', () => {
    describe('Should produce an action in the expected shape', () => {
        test('addTodo', () => {
            const input = { id: 42, text: 'testing' };
            const result = todoActions.ActionCreators.AddTodo.create(input);

            expect(result).toEqual({ type: todoActions.ActionCreators.AddTodo.type, payload: input });
        });

        test('setTodoCompletion', () => {
            const input = { id: 42, completed: true };
            const result = todoActions.ActionCreators.SetTodoCompletion.create(input);

            expect(result).toEqual({ type: todoActions.ActionCreators.SetTodoCompletion.type, payload: input });
        });

        test('setAllTodosCompletion', () => {
            const completed = true;
            const result = todoActions.ActionCreators.SetAllTodosCompletion.create({ completed });

            expect(result).toEqual({
                payload: { completed },
                type: todoActions.ActionCreators.SetAllTodosCompletion.type,
            });
        });

        test('setTodoText', () => {
            const input = { id: 42, text: 'newText' };
            const result = todoActions.ActionCreators.SetTodoText.create(input);

            expect(result).toEqual({ type: todoActions.ActionCreators.SetTodoText.type, payload: input });
        });

        test('removeTodo', () => {
            const id = 42;
            const result = todoActions.ActionCreators.RemoveTodo.create({ id });

            expect(result).toEqual({ type: todoActions.ActionCreators.RemoveTodo.type, payload: { id } });
        });

        test('removeCompleted', () => {
            const result = todoActions.removeCompleted();

            expect(result).toEqual({ type: todoActions.REMOVE_COMPLETED, payload: {} });
        });
    });
});
