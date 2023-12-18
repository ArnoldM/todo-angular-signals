import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/interfaces/todo';
import { RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  template: `
    <ul>
      @for (todo of todos; track todo.id) {
      <li>
        <a [routerLink]="['/detail', todo.id]">{{ todo.title }}</a>
        &nbsp;
        <button
          (click)="toggleTodoState.emit(todo)"
          [ngStyle]="{ 'background-color': todo.completed ? 'green' : 'red' }"
        >
          @if (todo.completed) { Completed } @else { Todo }
        </button>
      </li>
      } @empty {
      <li>Nothing to do!</li>
      }
    </ul>
  `,
  imports: [RouterLink, NgStyle],
  styles: [
    `
      ul {
        margin: 0;
        padding: 1rem;
      }
    `,
  ],
})
export class TodoListComponent {
  @Input({ required: true }) todos!: Todo[];
  @Output() toggleTodoState = new EventEmitter<Todo>();
}
