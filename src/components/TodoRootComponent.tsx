import * as _ from 'lodash';
import * as React from 'react';

import { Todo } from '../Todo';
import { TodoHeader } from './TodoHeaderComponent';
import { Todos } from './TodosComponent';

interface ITodoRootProps {
}

interface ITodoRootState {
    todos: Todo[];
}

export class TodoRoot extends React.Component<ITodoRootProps, ITodoRootState> {
    constructor(props: ITodoRootProps) {
        super(props);

        this.state = {
            todos: [],
        };
    }

    public render(): JSX.Element | null {
        return (
            <div>
                <TodoHeader addTodo={(t) => this.addTodo(t)}></TodoHeader>
                <Todos todos={this.state.todos} setCompleted={(t, e) => this.setCompleted(t, e)} ></Todos>
            </div>
        );
    }

    public addTodo(todoText: string): void {
        const newId = this.state.todos.length;
        const newTodo = new Todo(newId, todoText);
        this.setState({ todos: (this.state.todos || []).concat([newTodo]) });
    }

    public setCompleted(todo: Todo, completed: boolean) {
        const nextTodos = this.state.todos.map((t) => {
            if (t.id === todo.id) {
                return _.assign({} as Todo, t, { completed });
            }
            return t;
        });

        this.setState({ todos: nextTodos});
    }
}
