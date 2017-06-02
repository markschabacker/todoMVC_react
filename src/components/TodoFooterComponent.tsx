import * as _ from 'lodash';
import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { FilterType } from '../FilterType';
import { IFilterRoute } from '../IFilterRoute';
import { Todo } from '../Todo';

interface ITodoFooterProps {
    todos: Todo[];
    clearCompleted: () => void;
    filterRoutes: IFilterRoute[];
}

interface ITodoFooterState {
    activeCount: number;
    completedCount: number;
}

export class TodoFooter extends React.Component<ITodoFooterProps, ITodoFooterState> {
    constructor(props: ITodoFooterProps) {
        super(props);

        this.state = this.getCountsForState(props);
    }

    public render(): JSX.Element | null {
        return (
            <footer id='footer'>
                <span id='todo-count'>
                    <strong>{this.state.activeCount}</strong> {this.pluralize('item', this.state.activeCount)} left
                </span>
                <ul id='filters'>
                    {
                        this.props.filterRoutes.map((fr) => {
                            return (
                                <li key={fr.name}>
                                    <NavLink activeClassName='selected' to={fr.path}>{fr.name}</NavLink>
                                </li>
                            );
                        })
                    }
                </ul>
                {(this.state.completedCount > 0)
                    && <button
                        id='clear-completed'
                        onClick={(e) => this.props.clearCompleted()}>
                        Clear Completed ({this.state.completedCount})
                        </button>}
            </footer>
        );
    }

    public componentWillReceiveProps?(nextProps: Readonly<ITodoFooterProps>, nextContext: any): void {
        this.setState(this.getCountsForState(nextProps));
    }

    private getCountsForState(props: ITodoFooterProps): ITodoFooterState {
        return {
            activeCount: props.todos.filter((t) => !t.completed).length,
            completedCount: props.todos.filter((t) => t.completed).length,
        };
    }

    private pluralize(input: string, count: number): string {
        return count === 1 ? input : input + 's';

    }
}
