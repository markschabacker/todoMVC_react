import * as _ from 'lodash';
import * as React from 'react';

import { Todo as TodoItem } from '../types';
import { Todo } from './TodoComponent';

interface ITodosProps {
    todos: TodoItem[];

    setCompleted: (todoId: number, completed: boolean) => void;
    setAllCompleted: (completed: boolean) => void;
    updateText: (todoId: number, text: string) => void;
    remove: (todoId: number) => void;
}

interface ITodosState {
}

export class Todos extends React.Component<ITodosProps, ITodosState> {
    public render(): JSX.Element | null {
        const todos = this.props.todos;

        if (!todos || !todos.length) {
            return null;
        }

        const allCompleted = todos.every((t) => t.completed);

        return (
            <section className='main'>
                <ul className='todo-list'>
                    { todos.map((todo, index) => { return (
                        <Todo key={index}
                            todo={todo}
                            setCompleted={(t, e) => this.props.setCompleted(t, e) }
                            updateText={(t, text) => this.props.updateText(t, text) }
                            remove={(t) => this.props.remove(t)}></Todo>
                        ); })
                    }
                </ul>
                <input className='toggle-all'
                        type='checkbox'
                        checked={allCompleted}
                        onChange={(e) => this.handleToggleAllChange(e)}></input>
            </section>
        );
    }

    private handleToggleAllChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.blur();
        this.props.setAllCompleted(e.target.checked);
    }
}
