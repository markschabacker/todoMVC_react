export class ActionCreator<T, P> {
  constructor(public readonly type: T) {
    this.type = type;
  }

  public readonly create = (payload: P) => ({ type: this.type, payload });
}
