import * as _ from 'lodash';
import * as React from 'react';

import { FilterType } from '../FilterType';
import { Todo } from '../Todo';

import { TodoFilter } from './TodoFilterComponent';
import { TodoHeader } from './TodoHeaderComponent';
import { Todos } from './TodosComponent';

interface ITodoRootProps {
}

interface ITodoRootState {
    todos: Todo[];
    filterType: FilterType,
}

export class TodoRoot extends React.Component<ITodoRootProps, ITodoRootState> {
    constructor(props: ITodoRootProps) {
        super(props);

        this.state = {
            todos: [],
            filterType: FilterType.All,
        };
    }

    public render(): JSX.Element | null {
        return (
            <div>
                <TodoHeader addTodo={(t) => this.addTodo(t)}></TodoHeader>
                <Todos todos={this.filteredTodos()} setCompleted={(t, e) => this.setCompleted(t, e)} ></Todos>
                <TodoFilter
                    todos={this.state.todos}
                    filterType={this.state.filterType}
                    setFilterType={(ft) => this.setFilterType(ft)}></TodoFilter>
            </div>
        );
    }

    public addTodo(todoText: string): void {
        const newId = this.state.todos.length;
        const newTodo = new Todo(newId, todoText);
        this.setState({ todos: (this.state.todos || []).concat([newTodo]) });
    }

    public setCompleted(todo: Todo, completed: boolean) {
        const nextTodos = this.state.todos.map((t) => {
            if (t.id === todo.id) {
                return _.assign({} as Todo, t, { completed });
            }
            return t;
        });

        this.setState({ todos: nextTodos});
    }

    public setFilterType(filterType: FilterType): void {
        this.setState({ filterType });
    }

    public filteredTodos(): Todo[] {
        const filterType = this.state.filterType;

        if (filterType === FilterType.Active) {
            return this.state.todos.filter((t) => !t.completed);
        } else if (filterType === FilterType.Completed) {
            return this.state.todos.filter((t) => t.completed);
        }
        return this.state.todos;
    }
}
