export class Todo {
    public completed: boolean;

    constructor(public id: number, public text: string) {
        this.completed = false;
    }
}
