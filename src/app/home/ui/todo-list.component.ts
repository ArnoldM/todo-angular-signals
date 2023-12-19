import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Todo } from '../../shared/interfaces/todo';
import { RouterLink } from '@angular/router';
import { NgClass, NgStyle } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-todo-list',
  template: `
    <ul>
      @for (todo of todos; track todo.id) {
      <li [ngClass]="{ completed: todo.completed }">
        <button (click)="deleteTodo.emit(todo)" class="delete-btn">X</button>
        <a [routerLink]="['/detail', todo.id]">{{ todo.title }}</a>
        <button (click)="toggleTodoState.emit(todo)" class="toggle-btn">
          @if (todo.completed) { Completed } @else { Todo }
        </button>
      </li>
      } @empty {
      <li>Nothing to do!</li>
      }
    </ul>
  `,
  imports: [RouterLink, NgStyle, NgClass],
  styles: [
    `
      ul {
        margin: 0;
        padding: 1rem;
      }
      li {
        display: flex;
        align-items: stretch;
        list-style: none;
      }
      a {
        flex: 1;
        text-decoration: none;
        color: gray;
      }
      button {
        background-color: white;
        padding: 10px;
        border: 1px solid;
      }
      .delete-btn {
        color: red;
        border-color: red;
        border-radius: 4px 0 0 4px;
      }
      .toggle-btn {
        color: #0077cc;
        border-color: #0077cc;
        border-radius: 0 4px 4px 0;
      }
      .completed {
        .toggle-btn {
          color: green;
          border-color: green;
        }
        a {
          text-decoration: line-through;
        }
      }
    `,
  ],
})
export class TodoListComponent {
  @Input({ required: true }) todos!: Todo[];
  @Output() toggleTodoState = new EventEmitter<Todo>();
  @Output() deleteTodo = new EventEmitter<Todo>();
}
