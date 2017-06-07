import * as _ from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { HashRouter as Router, Link, Redirect, Route } from 'react-router-dom';

import { returntypeof } from '../utils/returntypeof';

import { ActionCreators } from '../actions/todoActions';

import { FilterType, IFilterRoute, IRootState, Todo } from '../types';

import { TodoFooter } from './TodoFooterComponent';
import { TodoHeader } from './TodoHeaderComponent';
import { Todos } from './TodosComponent';

const mapStateToProps = (state: IRootState) => {
    return {
        todos: state.todos,
    };
};

const dispatchToProps = {
    addTodo: ActionCreators.AddTodo.create,
    removeCompletedTodos: ActionCreators.RemoveCompletedTodos.create,
    removeTodo: ActionCreators.RemoveTodo.create,
    setAllTodosCompletion: ActionCreators.SetAllTodosCompletion.create,
    setTodoCompletion: ActionCreators.SetTodoCompletion.create,
    setTodoText: ActionCreators.SetTodoText.create,
};

const stateProps = returntypeof(mapStateToProps);
type TodoAppProps = typeof stateProps & typeof dispatchToProps;

class TodoApp extends React.Component<TodoAppProps, {}> {
    constructor(props: TodoAppProps) {
        super(props);

        this.state = {};
    }

    public render(): JSX.Element | null {
        const filterRoutes = this.calculateFilterRoutes();

        return (
            <Router>
                <div>
                    <TodoHeader
                        addTodo={(t) => this.addTodo(t)}
                        refresh={() => this.refresh() } />
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
        this.props.addTodo({ text: todoText });
    }

    public setCompleted(todoId: number, completed: boolean) {
        this.props.setTodoCompletion({ id: todoId, completed });
    }

    public setAllCompleted(completed: boolean) {
        this.props.setAllTodosCompletion({ completed });
    }

    public updateText(todoId: number, text: string) {
        this.props.setTodoText({ id: todoId, text });
    }

    public clearCompleted(): void {
        this.props.removeCompletedTodos({});
    }

    public removeTodo(todoId: number) {
        this.props.removeTodo({ id: todoId });
    }

    public refresh() {
        console.log('refresh');
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

const wrappedTodoApp = connect(mapStateToProps, dispatchToProps)(TodoApp);
export { wrappedTodoApp as TodoApp };
