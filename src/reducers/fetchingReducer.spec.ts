import { ActionCreators } from '../actions/fetchingActions';
import { fetchingReducer } from './fetchingReducer';

describe('Fetching Reducer', () => {
    describe('Set Fetching', () => {
        [true, false].forEach((fetchingValue) => {
            const initialState = !fetchingValue;
            const action = ActionCreators.SetFetching.create(fetchingValue);
            let nextState: boolean;

            beforeEach(() => {
                nextState = fetchingReducer(initialState, action);
            });

            it('should set the fetching state according to the payload', () => {
                expect(nextState).toBe(fetchingValue);
            });
        });
    });
});
