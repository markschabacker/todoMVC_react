import { Todo } from '../Todo';

export function addTodo(todo: Todo) {
    return { type: 'ADD_TODO', todo};
}

export function setTodoCompletion(todoState: { id: number, completed: boolean}) {
    return { type: 'SET_COMPLETION', todoState};
}

export function updateTodoText(todoState: { id: number, text: string}) {
    return { type: 'SET_TEXT', todoState};
}

export function removeTodo(id: number) {
    return { type: 'REMOVE', id};
}

export function removeCompleted() {
    return { type: 'REMOVE_COMPLETED' };
}
