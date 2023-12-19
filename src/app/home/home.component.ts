import { Component, inject } from '@angular/core';
import { TodoFormComponent } from './ui/todo-form.component';
import { TodoService } from '../shared/data-acces/todo.service';
import { TodoListComponent } from './ui/todo-list.component';

@Component({
  standalone: true,
  selector: 'app-home',
  template: `
    <h2>Todo</h2>
    <app-todo-form (todoSubmitted)="todoService.addTodo($event)" />
    <app-todo-list
      [todos]="todoService.todos()"
      (toggleTodoState)="todoService.toggleTodoState($event)"
      (deleteTodo)="todoService.deleteTodo($event)"
    />
  `,
  imports: [TodoFormComponent, TodoListComponent],
  styles: `
    :host {
      display: block;
      width: 500px;
    }
  `,
})
export default class HomeComponent {
  todoService = inject(TodoService);
}
