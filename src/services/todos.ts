import { set, get } from "./storage";
import { Todo } from "../interfaces/todo";

class todosServiceController {
  public todos: Todo[];

  async load(): Promise<Todo[]> {
    if (this.todos) {
      return this.todos;
    } else {
      this.todos = (await get("todos")) || [];
      return this.todos;
    }
  }

  async save(): Promise<void> {
    return await set("todos", this.todos);
  }

  getTodo(id): Todo {
    return this.todos.find(Todo => Todo.id === id);
  }

  createTodo(title): void {
    // Create a unique id that is one larger than the current largest id
    let id = Math.max(...this.todos.map(Todo => parseInt(Todo.id)), 0) + 1;

    this.todos.push({
      id: id.toString(),
      title: title,
      content: ""
    });

    this.save();
  }

  updateTodo(Todo, content): void {
    // Get the index in the array of the Todo that was passed in
    let index = this.todos.indexOf(Todo);

    this.todos[index].content = content;
    this.save();
  }

  deleteTodo(Todo): void {
    // Get the index in the array of the Todo that was passed in
    let index = this.todos.indexOf(Todo);

    // Delete that element of the array and resave the data
    if (index > -1) {
      this.todos.splice(index, 1);
      this.save();
    }
  }
}

export const TodosService = new todosServiceController();