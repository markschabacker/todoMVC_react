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
            const result = todoActions.ActionCreators.RemoveCompletedTodos.create({});

            expect(result).toEqual({ type: todoActions.ActionCreators.RemoveCompletedTodos.type, payload: {} });
        });

        test('setTodos', () => {
            const input = [
                {
                    completed: false,
                    id: 0,
                    text: 'setTodo0',
                },
                {
                    completed: false,
                    id: 1,
                    text: 'setTodo1',
                },
            ];
            const result = todoActions.ActionCreators.SetTodos.create({ todos: input });

            expect(result).toEqual({ type: todoActions.ActionCreators.SetTodos.type, payload: { todos: input } });
        });
    });
});
