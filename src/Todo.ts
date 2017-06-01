export class Todo {
    public completed: boolean;

    constructor(public id: any, public text: string) {
        this.completed = false;
    }
}
