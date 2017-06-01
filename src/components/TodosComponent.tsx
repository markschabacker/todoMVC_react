import * as React from 'react';

import { Todo } from '../Todo';

interface ITodosProps {
    todos: Todo[];
}

interface ITodosState {
}

export class Todos extends React.Component<ITodosProps, ITodosState> {
    public render(): JSX.Element | null {
        return (
            <div>
                <pre>{JSON.stringify(this.props.todos)}</pre>
            </div>
            );
    }
}
