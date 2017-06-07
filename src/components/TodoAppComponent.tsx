import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Redirect, Route } from 'react-router-dom';

import * as todoActions from '../actions/todoActions';

import { FilterType, IFilterRoute, IRootState, Todo } from '../types';

import { TodoFooter } from './TodoFooterComponent';
import { TodoHeader } from './TodoHeaderComponent';
import { Todos } from './TodosComponent';

interface ITodoAppProps {
    todos: Todo[];
    dispatch?: (action: any) => void;
}

interface ITodoAppState {
}

class TodoApp extends React.Component<ITodoAppProps, ITodoAppState> {
    constructor(props: ITodoAppProps) {
        super(props);

        this.state = {};
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
                        todos={this.props.todos}
                        filterRoutes={filterRoutes}
                        clearCompleted={() => this.clearCompleted()} />
                </div>
            </Router>
        );
    }

    public addTodo(todoText: string): void {
        const newId = 1 + (_.max(this.props.todos.map((t) => t.id)) || 0);
        this.props.dispatch(todoActions.ActionCreators.AddTodo.create({ id: newId, text: todoText }));
    }

    public setCompleted(todoId: number, completed: boolean) {
        this.props.dispatch(todoActions.ActionCreators.SetTodoCompletion.create({ id: todoId, completed }));
    }

    public setAllCompleted(completed: boolean) {
        this.props.dispatch(todoActions.ActionCreators.SetAllTodosCompletion.create({ completed }));
    }

    public updateText(todoId: number, text: string) {
        this.props.dispatch(todoActions.ActionCreators.SetTodoText.create({ id: todoId, text }));
    }

    public clearCompleted(): void {
        this.props.dispatch(todoActions.removeCompleted());
    }

    public removeTodo(todoId: number) {
        this.props.dispatch(todoActions.ActionCreators.RemoveTodo.create({ id: todoId }));
    }

    private filteredTodos(filterType: FilterType): Todo[] {
        if (filterType === FilterType.Active) {
            return this.props.todos.filter((t) => !t.completed);
        } else if (filterType === FilterType.Completed) {
            return this.props.todos.filter((t) => t.completed);
        }
        return this.props.todos;
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

function mapStateToProps(state: IRootState, ownProps: ITodoAppProps): ITodoAppProps {
    return {
        todos: state.todos,
    };
}

const wrappedTodoApp = connect(mapStateToProps)(TodoApp);
export { wrappedTodoApp as TodoApp };
