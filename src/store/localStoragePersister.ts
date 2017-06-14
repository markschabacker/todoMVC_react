import { IRootState } from '../types';

const localStorageKey = 'todoState';

export class LocalStoragePersister {

    public loadPersistedState(): IRootState {
        return JSON.parse(localStorage.getItem(localStorageKey) || '{ "todos": [] }') as IRootState;
    }

    public persistState(state: IRootState): void {
        localStorage.setItem(localStorageKey, JSON.stringify(state));
    }
}
