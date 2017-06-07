import { ActionCreator } from '../types';

export const ActionCreators = {
    SetFetching: new ActionCreator<'SetFetching', boolean>('SetFetching'),
};
