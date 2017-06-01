import * as React from 'react';

import { Todo as TodoItem } from '../Todo';
import { Todo } from './TodoComponent';


interface ITodosProps {
    todos: TodoItem[];

    setCompleted: (todo: TodoItem, completed: boolean) => void;
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
                        <Todo key={index}
                            todo={todo}
                            setCompleted={(t, e) => this.props.setCompleted(t, e) }></Todo>
                        ); })
                    }
                </ul>
            </section>
        );
    }
}
