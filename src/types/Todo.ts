export class Todo {
    constructor(public readonly id: number, public readonly text: string, public readonly completed: boolean = false) {
    }
}
