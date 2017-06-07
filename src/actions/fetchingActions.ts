import { ActionCreator } from '../types';
import { ActionCreators as TodoActionCreators } from './todoActions';

import 'isomorphic-fetch';

const setFetching = new ActionCreator<'SetFetching', boolean>('SetFetching');

const fetchServerData = {
    create: () => {
        return (dispatch: (action: any) => void) => {
            dispatch(setFetching.create(true));
            return fetch('/src/seedData.json')
                .then((response) => response.json())
                .then((json) => {
                    dispatch(TodoActionCreators.SetTodos.create({ todos: json }));
                    dispatch(setFetching.create(false));
                })
                .catch((reason) => {
                    console.error('fetch error', reason);
                    window.alert('Error fetching data');
                    dispatch(setFetching.create(false));
                });
        };
    },
};

export const ActionCreators = {
    FetchServerData: fetchServerData,
    SetFetching: setFetching,
};
