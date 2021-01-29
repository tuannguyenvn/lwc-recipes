import { LightningElement, api } from 'lwc';

export default class TodoList extends LightningElement {
    // Spring 20 Note on tracked properties: this component may seem to
    // mutate an array, but because Array.prototype.filter() always creates
    // a new array, in fact no mutation occurs. Since we always assign
    // a new array to filteredTodos, the track decorator is not required.
    filteredTodos = [];

    _todos = [
        { id: 1, description: 'Explore recipes', priority: false },
        { id: 2, description: 'Install Ebikes sample app', priority: false },
        { id: 2, description: 'Show app ', priority: true }

    ];

    priorityFilter = false;

    @api
    get todos() {
        return this._todos;
    }
    set todos(value) {
        this._todos = value;
        this.filterTodos();
    }

    filterTodos() {
        if (this.priorityFilter) {
            this.filteredTodos = this._todos.filter(
                (todo) => todo.priority === true
            );
        } else {
            this.filteredTodos = this._todos;
        }
    }

    handleCheckboxChange(event) {
        this.priorityFilter = event.target.checked;
        this.filterTodos();
    }
    connectedCallback() {
        this.filterTodos();
    }
}
