import { ActionCreators } from '../actions/fetchingActions';

export function fetchingReducer(state: boolean = false, action: { type: string, payload: any }): boolean {
    if (action.type === ActionCreators.SetFetching.type) {
        return (action.payload as boolean);
    }

    return state;
}
