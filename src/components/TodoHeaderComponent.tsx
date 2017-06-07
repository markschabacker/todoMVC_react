import * as React from 'react';

interface ITodoHeaderProps {
    addTodo: (todoText: string) => void;
    refresh: () => void;
}

interface ITodoHeaderState {
    inputValue: string;
}

export class TodoHeader extends React.Component<ITodoHeaderProps, ITodoHeaderState> {
    constructor(props: ITodoHeaderProps) {
        super(props);

        this.state = {
            inputValue: '',
        };
    }

    public render(): JSX.Element | null {
        return (
            <header id='header'>
                <h1>todos <a onClick={(e) => this.props.refresh()}>&#8635;</a></h1>
                <input
                    id='new-todo'
                    value={this.state.inputValue}
                    onChange={(e) => this.inputChange(e)}
                    onKeyPress={(e) => this.keyPress(e)}
                    autoFocus
                    placeholder='What needs to be done?'>
                </input>
            </header>
        );
    }

    private inputChange(e: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({inputValue: e.currentTarget.value});
    }

    private keyPress(e: React.KeyboardEvent<HTMLInputElement>): void {
        if (e.key === 'Enter') {
            if (this.state.inputValue && this.state.inputValue.length) {
                this.props.addTodo(this.state.inputValue);
                this.setState({ inputValue: '' });
            }
        }
    }
}
