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

interface ITodoUpdateProperties {
    completed?: boolean;
    editing?: boolean;
    text?: string;
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

    public setCompleted(todoId: number, completed: boolean) {
        this.updateTodo(todoId, { completed });
    }

    public setAllCompleted(completed: boolean) {
        this.updateTodos((t) => true, { completed });
    }

    public setEditing(todoId: number, editing: boolean) {
        this.updateTodo(todoId, { editing });
    }

    public updateText(todoId: number, text: string) {
        this.updateTodo(todoId, { text, editing: false });
    }

    public clearCompleted(): void {
        this.setState({todos: this.state.todos.filter((t) => !t.completed)});
    }

    public removeTodo(todoId: number) {
        const nextTodos = this.state.todos.filter((t) => t.id !== todoId);
        this.setState({ todos: nextTodos});
    }

    private updateTodo(todoId: number, updateProperties: ITodoUpdateProperties): void {
        this.updateTodos((t) => t.id === todoId, updateProperties);
    }

    private updateTodos(matcher: (todo: Todo) => boolean, updateProperties: ITodoUpdateProperties) {
        const nextTodos = this.state.todos.map((t) => {
            if (matcher(t)) {
                return _.assign({} as Todo, t, updateProperties);
            }
            return t;
        });

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
