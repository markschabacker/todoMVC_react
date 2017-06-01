import * as _ from 'lodash';
import * as React from 'react';

import { FilterType } from '../FilterType';
import { Todo } from '../Todo';

interface ITodoFilterProps {
    todos: Todo[];
    filterType: FilterType;
    setFilterType: (filterType: FilterType) => void;
}

interface IFilterOption {
    name: string;
    filterType: FilterType;
}

interface ITodoFilterState {
    activeCount: number;
    completedCount: number;
    filterOptions: IFilterOption[];
}

export class TodoFilter extends React.Component<ITodoFilterProps, ITodoFilterState> {
    constructor(props: ITodoFilterProps) {
        super(props);

        this.state = _.assign({
            filterOptions: this.calculateFilterOptions(),
        }, this.getCountsForState(props));
    }

    public render(): JSX.Element | null {
        return (
            <footer id='footer'>
                <span id='todo-count'>
                    <strong>{this.state.activeCount}</strong> items left
                </span>
                <ul id='filters'>
                    {
                        this.state.filterOptions.map((fo) => {
                            return (
                                <li key={fo.filterType}>
                                    <a
                                        className={fo.filterType === this.props.filterType ? 'selected' : ''}
                                        onClick={(e) => this.props.setFilterType(fo.filterType)}>
                                        {fo.name}
                                    </a>
                                </li>
                            );
                        })
                    }
                </ul>
                {(this.state.completedCount > 0)
                    && <button id='clear-completed'>Clear Completed ({this.state.completedCount})</button>}
            </footer>
        );
    }

    public componentWillReceiveProps?(nextProps: Readonly<ITodoFilterProps>, nextContext: any): void{
        this.setState(this.getCountsForState(nextProps));
    }

    private calculateFilterOptions(): IFilterOption[] {
        const options: IFilterOption[] = [];
        for (const n in FilterType) {
            if (_.isNumber(FilterType[n])) {
                options.push({
                    filterType: (FilterType as any)[n],
                    name: n,
                });
            }
        }
        return options;
    }

    private getCountsForState(props: ITodoFilterProps) {
        return {
            activeCount: props.todos.filter((t) => !t.completed).length,
            completedCount: props.todos.filter((t) => t.completed).length,
        };
    }
}
