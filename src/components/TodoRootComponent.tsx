import * as React from 'react';

import { Todo } from '../Todo';
import { TodoHeader } from './TodoHeaderComponent';

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
                <div>
                    <pre>{ JSON.stringify(this.state.todos) }</pre>
                </div>
            </div>
        );
    }

    public addTodo(todoText: string): void {
        this.setState({ todos: (this.state.todos || []).concat([new Todo(todoText)])});
    }
}
