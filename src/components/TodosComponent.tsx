import * as React from 'react';

import { Todo } from '../Todo';

interface ITodosProps {
    todos: Todo[];
}

interface ITodosState {
}

export class Todos extends React.Component<ITodosProps, ITodosState> {
    public render(): JSX.Element | null {
        const todos = this.props.todos;

        if (!todos || !todos.length) {
            return null;
        }

        return (
            <section id='main'>
                <ul id='todo-list'>
                    { todos.map((todo, index) => { return (
                        <li key={index}>
                            <label>{todo.text}</label>
                        </li>
                        ); })
                    }
                </ul>
            </section>
        );
    }
}
