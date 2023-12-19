import { Injectable, signal } from '@angular/core';
import { CreateTodo, Todo } from '../interfaces/todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  #todos = signal<Todo[]>([]);

  todos = this.#todos.asReadonly();

  addTodo(todo: CreateTodo) {
    this.#todos.update((todos) => [
      ...todos,
      { ...todo, completed: false, id: Date.now().toString() },
    ]);
  }

  toggleTodoState(todo: Todo) {
    this.#todos.update((todos) => {
      const index = todos.indexOf(todo);
      todo.completed = !todo.completed;
      todos.splice(index, 1, todo);
      return todos;
    });
  }

  deleteTodo(todo: Todo) {
    this.#todos.update((todos) => {
      const rest = [...todos.filter((item) => item.id !== todo.id)];
      return rest;
    });
  }
}
