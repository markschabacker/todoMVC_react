import { ActionCreators } from './fetchingActions';

describe('Fetching Actions', () => {
    describe('Set Fetching', () => {
        [true, false].forEach((fetchingValue) => {
            let action: { type: string, payload: any } = null;

            beforeEach(() => {
                action = ActionCreators.SetFetching.create(fetchingValue);
            });

            it('should create an action with the expected type', () => {
                expect(action.type).toBe(ActionCreators.SetFetching.type);
            });

            it('should create an action with the expected payload', () => {
                expect(action.payload).toBe(fetchingValue);
            });
        });
    });
});
