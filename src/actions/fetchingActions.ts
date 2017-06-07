import { ActionCreator } from '../types';

import 'isomorphic-fetch';

const setFetching = new ActionCreator<'SetFetching', boolean>('SetFetching');

const fetchServerData = {
    create: () => {
        return (dispatch: (action: any) => void) => {
            dispatch(setFetching.create(true));
            return fetch('/src/seedData.json')
                .then((response) => response.json())
                .then((json) => {
                    console.log(json);
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
