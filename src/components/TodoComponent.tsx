
import * as React from 'react';

import { Todo as TodoItem } from '../Todo';

interface ITodoProps {
    todo: TodoItem;
}

interface ITodoState {
}

export class Todo extends React.Component<ITodoProps, ITodoState> {
    public render(): JSX.Element | null {
        const todo = this.props.todo;
        return (
            <li>
                <label>{todo.text}</label>
            </li>
        );
    }
}

