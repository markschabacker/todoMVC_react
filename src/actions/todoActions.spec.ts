import * as todoActions from './todoActions';

describe('Todo Actions', () => {
    describe('Should produce an action in the expected shape', () => {
        test('addTodo', () => {
            const input = { id: 42, text: 'testing' };
            const result = todoActions.addTodo(input);

            expect(result).toEqual({ type: todoActions.ADD_TODO, payload: input });
        });

        test('setTodoCompletion', () => {
            const input = { id: 42, completed: true };
            const result = todoActions.setTodoCompletion(input);

            expect(result).toEqual({ type: todoActions.SET_COMPLETION, payload: input });
        });

        test('setTodoText', () => {
            const input = { id: 42, text: 'newText' };
            const result = todoActions.setTodoText(input);

            expect(result).toEqual({ type: todoActions.SET_TEXT, payload: input });
        });

        test('removeTodo', () => {
            const id = 42;
            const result = todoActions.removeTodo(id);

            expect(result).toEqual({ type: todoActions.REMOVE, payload: { id } });
        });

        test('removeCompleted', () => {
            const result = todoActions.removeCompleted();

            expect(result).toEqual({ type: todoActions.REMOVE_COMPLETED, payload: {} });
        });
    });
});
