import * as _ from 'lodash';
import * as React from 'react';
import { HashRouter as Router, Link, Redirect, Route } from 'react-router-dom';

import { configureStore } from '../store/configureStore';

import * as todoActions from '../actions/todoActions';

import { FilterType } from '../FilterType';
import { IFilterRoute } from '../IFilterRoute';
import { IRootState } from '../IRootState';
import { Todo } from '../Todo';

import { TodoFooter } from './TodoFooterComponent';
import { TodoHeader } from './TodoHeaderComponent';
import { Todos } from './TodosComponent';

interface ITodoAppProps {
}

interface ITodoAppState {
    todos: Todo[];
}

const localStorageKey = 'todoState';
const initialState: IRootState = JSON.parse(localStorage.getItem(localStorageKey) || '{ todos: [] }');
const store = configureStore(initialState);

export class TodoApp extends React.Component<ITodoAppProps, ITodoAppState> {
    constructor(props: ITodoAppProps) {
        super(props);

        this.state = {
            todos: store.getState().todos,
        };

        store.subscribe(() => {
            const state = store.getState();
            this.setState({ todos: state.todos });
            localStorage.setItem(localStorageKey, JSON.stringify(state));
        });
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
        store.dispatch(todoActions.addTodo({ id: newId, text: todoText }));
    }

    public setCompleted(todoId: number, completed: boolean) {
        store.dispatch(todoActions.setTodoCompletion({ id: todoId, completed }));
    }

    public setAllCompleted(completed: boolean) {
        store.dispatch(todoActions.setAllTodosCompletion(completed));
    }

    public updateText(todoId: number, text: string) {
        store.dispatch(todoActions.setTodoText({ id: todoId, text }));
    }

    public clearCompleted(): void {
        store.dispatch(todoActions.removeCompleted());
    }

    public removeTodo(todoId: number) {
        store.dispatch(todoActions.removeTodo(todoId));
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
                updateText={(t, text) => this.updateText(t, text)}
                remove={(t) => this.removeTodo(t)}></Todos>
        );
    }
}
