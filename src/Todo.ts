export class Todo {
    public completed: boolean;
    public editing: boolean;

    constructor(public id: number, public text: string) {
        this.completed = false;
        this.editing = false;
    }
}
