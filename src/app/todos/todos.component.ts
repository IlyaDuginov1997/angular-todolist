import { Component, OnInit } from '@angular/core';
import { Todo, TodosService } from 'src/app/services/todos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private todoService: TodosService) {}

  todos$!: Observable<Todo[]>;
  error = '';

  ngOnInit(): void {
    this.todos$ = this.todoService.todos$;

    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos();
  }

  createTodo() {
    const randomNumber = Math.floor(Math.random() * 100);
    const title = 'angular - ' + randomNumber;
    this.todoService.createTodo(title);
  }

  deleteTodo(todoId: string) {
    this.todoService.deleteTodo(todoId);
  }
}
