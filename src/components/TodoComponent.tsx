
import * as React from 'react';

import { Todo as TodoItem } from '../types';

interface ITodoProps {
    todo: TodoItem;

    setCompleted: (todoId: number, completed: boolean) => void;
    updateText: (todoId: number, text: string) => void;
    remove: (todoId: number) => void;
}

interface ITodoState {
    editing: boolean;
    itemText: string;
}

export class Todo extends React.Component<ITodoProps, ITodoState> {
    constructor(props: ITodoProps) {
        super(props);

        this.state = {
            editing: false,
            itemText: props.todo.text,
        };
    }

    public componentWillReceiveProps?(nextProps: Readonly<ITodoProps>, nextContext: any): void {
        this.setState({ itemText: nextProps.todo.text });
    }

    public render(): JSX.Element | null {
        const todo = this.props.todo;
        return (
            <li className={`${todo.completed ? 'completed' : ''} ${this.state.editing ? 'editing' : ''}`}>
                { this.getLIContents(todo) }
            </li>
        );
    }

    private getLIContents(todo: TodoItem): JSX.Element | JSX.Element[] {
        if (this.state.editing) {
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

            ), (
                <button key='destroy' className='destroy' onClick={(e) => this.handleRemoveClick(e)} />
            )];
        }
    }

    private handleCheckChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.target.blur();
        this.props.setCompleted(this.props.todo.id, e.target.checked);
    }

    private handleDoubleClick(e: React.MouseEvent<HTMLLabelElement>) {
        this.setState({editing: true});
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
        this.updateItemText();
    }

    private handleItemTextFocus(e: React.FocusEvent<HTMLInputElement>): void {
        e.currentTarget.select();
    }

    private updateItemText(): void {
        if (this.state.itemText && this.state.itemText.length) {
            this.props.updateText(this.props.todo.id, this.state.itemText);
        }
        this.setState({editing: false});
    }

    private handleRemoveClick(e: React.MouseEvent<HTMLButtonElement>): void {
        this.props.remove(this.props.todo.id);
    }
}
