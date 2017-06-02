import * as _ from 'lodash';
import * as React from 'react';
import { HashRouter as Router, Link, Redirect, Route } from 'react-router-dom';

import { FilterType } from '../FilterType';
import { IFilterRoute } from '../IFilterRoute';
import { Todo } from '../Todo';

import { TodoFooter } from './TodoFooterComponent';
import { TodoHeader } from './TodoHeaderComponent';
import { Todos } from './TodosComponent';

interface ITodoAppProps {
}

interface ITodoAppState {
    todos: Todo[];
}

export class TodoApp extends React.Component<ITodoAppProps, ITodoAppState> {
    constructor(props: ITodoAppProps) {
        super(props);

        this.state = {
            todos: [],
        };
    }

    public render(): JSX.Element | null {
        const filterRoutes = this.calculateFilterRoutes();

        return (
            <Router>
                <div>
                    <TodoHeader addTodo={(t) => this.addTodo(t)}></TodoHeader>
                    { filterRoutes.map((fr) => {
                        return <Route
                                    key={fr.name}
                                    path={fr.path}
                                    render={() => this.getTodosComponentForFilterType(fr.filterType)} />;
                    })}
                    <Redirect from='/' to={'/' + filterRoutes[0].name} />
                    <TodoFooter
                        todos={this.state.todos}
                        filterRoutes={filterRoutes}
                        clearCompleted={() => this.clearCompleted()} />
                </div>
            </Router>
        );
    }

    public addTodo(todoText: string): void {
        const newId = 1 + (_.max(this.state.todos.map((t) => t.id)) || 0);
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

    public setAllCompleted(completed: boolean) {
        const nextTodos = this.state.todos.map((t) => {
            return _.assign({} as Todo, t, { completed });
        });

        this.setState({ todos: nextTodos});
    }

    public clearCompleted(): void {
        this.setState({todos: this.state.todos.filter((t) => !t.completed)});
    }

    public setEditing(todo: Todo, editing: boolean) {
        const nextTodos = this.state.todos.map((t) => {
            if (t.id === todo.id) {
                return _.assign({} as Todo, t, { editing });
            }
            return t;
        });

        this.setState({ todos: nextTodos});
    }

    public updateText(todo: Todo, text: string) {
        const nextTodos = this.state.todos.map((t) => {
            if (t.id === todo.id) {
                return _.assign({} as Todo, t, { text, editing: false });
            }
            return t;
        });

        this.setState({ todos: nextTodos});
    }

    public removeTodo(todo: Todo) {
        const nextTodos = this.state.todos.filter((t) => t.id !== todo.id);
        this.setState({ todos: nextTodos});
    }

    private filteredTodos(filterType: FilterType): Todo[] {
        if (filterType === FilterType.Active) {
            return this.state.todos.filter((t) => !t.completed);
        } else if (filterType === FilterType.Completed) {
            return this.state.todos.filter((t) => t.completed);
        }
        return this.state.todos;
    }

    private calculateFilterRoutes(): IFilterRoute[] {
        const routes: IFilterRoute[] = [];
        for (const n in FilterType) {
            if (_.isNumber(FilterType[n])) {
                routes.push({
                    filterType: (FilterType as any)[n],
                    name: n,
                    path: `/${n}`,
                });
            }
        }
        return routes;
    }

    private getTodosComponentForFilterType(filterType: FilterType): JSX.Element {
        return (
            <Todos
                todos={this.filteredTodos(filterType)}
                setCompleted={(t, e) => this.setCompleted(t, e)}
                setAllCompleted={(e) => this.setAllCompleted(e)}
                setEditing={(t, e) => this.setEditing(t, e)}
                updateText={(t, text) => this.updateText(t, text)}
                remove={(t) => this.removeTodo(t)}></Todos>
        );
    }
}
