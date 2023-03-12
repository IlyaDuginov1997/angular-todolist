import { Component, OnDestroy, OnInit } from '@angular/core';
import { Todo, TodosService } from 'src/app/services/todos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit, OnDestroy {
  constructor(private todoService: TodosService) {}

  todos: Todo[] = [];
  error = '';
  subscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.getTodos();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getTodos() {
    this.subscription.add(
      this.todoService.getTodos().subscribe({
        next: res => {
          this.todos = res;
        },
        error: (error: HttpErrorResponse) => {
          this.error = error.message;
        },
      })
    );
  }

  createTodo() {
    const randomNumber = Math.floor(Math.random() * 100);
    const title = 'angular - ' + randomNumber;
    this.subscription.add(
      this.todoService.createTodo(title).subscribe({
        next: res => {
          this.todos.unshift(res.data.item);
        },
        error: (error: HttpErrorResponse) => {
          this.error = error.message;
        },
      })
    );
  }

  deleteTodo(todoId: string) {
    this.subscription.add(
      this.todoService.deleteTodo(todoId).subscribe({
        next: () => {
          this.todos = this.todos.filter(el => el.id !== todoId);
        },
        error: (error: HttpErrorResponse) => {
          this.error = error.message;
        },
      })
    );
  }
}
