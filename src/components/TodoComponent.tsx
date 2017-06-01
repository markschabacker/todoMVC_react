
import * as React from 'react';

import { Todo as TodoItem } from '../Todo';

interface ITodoProps {
    todo: TodoItem;

    setCompleted: (todo: TodoItem, completed: boolean) => void;
    setEditing: (todo: TodoItem, editing: boolean) => void;
    updateText: (todo: TodoItem, text: string) => void;
}

interface ITodoState {
    itemText: string;
}

export class Todo extends React.Component<ITodoProps, ITodoState> {
    constructor(props: ITodoProps) {
        super(props);

        this.state = {
            itemText: props.todo.text,
        };
    }

    public componentWillReceiveProps?(nextProps: Readonly<ITodoProps>, nextContext: any): void {
        this.setState({ itemText: nextProps.todo.text });
    }

    public render(): JSX.Element | null {
        const todo = this.props.todo;
        return (
            <li className={`${todo.completed ? 'completed' : ''} ${todo.editing ? 'editing' : ''}`}>
                { this.getLIContents(todo) }
            </li>
        );
    }

    private getLIContents(todo: TodoItem): JSX.Element | JSX.Element[] {
        if (todo.editing) {
            return <input
                        className='edit'
                        value={this.state.itemText}
                        onChange={(e) => this.handleItemTextChange(e)}
                        onKeyPress={(e) => this.handleItemTextKeyPress(e)}
                        onBlur={(e) => this.handleItemTextBlur(e)}
                        onFocus={(e) => this.handleItemTextFocus(e)}
                        autoFocus>
                        </input >;
        } else {
            return [(
                <input type='checkbox'
                    className='toggle'
                    checked={this.props.todo.completed}
                    onChange={(e) => this.handleCheckChange(e)}
                    key='checkbox'>
                </input>
            ), (
                <label key='text'
                        onDoubleClick={(e) => this.handleDoubleClick(e)}>{todo.text}</label>

            )];
        }
    }

    private handleCheckChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.blur();
        this.props.setCompleted(this.props.todo, e.target.checked);
    }

    private handleDoubleClick(e: React.MouseEvent<HTMLLabelElement>) {
        this.props.setEditing(this.props.todo, true);
    }

    private handleItemTextChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({ itemText: e.target.value });
    }

    private handleItemTextKeyPress(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Enter') {
            this.updateItemText();
        }
    }

    private handleItemTextBlur(e: React.FocusEvent<HTMLInputElement>): void {
        if (!this.updateItemText()) {
            this.props.setEditing(this.props.todo, false);
        }
    }

    private handleItemTextFocus(e: React.FocusEvent<HTMLInputElement>): void {
        e.currentTarget.select();
    }

    private updateItemText(): boolean {
        if (this.state.itemText && this.state.itemText.length) {
            this.props.updateText(this.props.todo, this.state.itemText);
            return true;
        }
        return false;
    }
}
