import { Todo } from './Todo';

export interface IRootState {
    todos: Todo[];
    fetching: boolean;
}
