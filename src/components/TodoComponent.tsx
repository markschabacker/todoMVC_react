
import * as React from 'react';

import { Todo as TodoItem } from '../Todo';

interface ITodoProps {
    todo: TodoItem;

    setCompleted: (todo: TodoItem, completed: boolean) => void;
}

interface ITodoState {
}

export class Todo extends React.Component<ITodoProps, ITodoState> {
    public render(): JSX.Element | null {
        const todo = this.props.todo;
        return (
            <li className={todo.completed ? 'completed' : ''}>
                <input type='checkbox'
                    className='toggle'
                    checked={this.props.todo.completed}
                    onChange={(e) => this.handleCheckChange(e)}>
                </input>
                <label>{todo.text}</label>
            </li>
        );
    }

    private handleCheckChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.blur();
        this.props.setCompleted(this.props.todo, e.target.checked);
    }
}
