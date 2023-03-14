import { Component, OnInit } from '@angular/core';
import { Todo, TodosService } from 'src/app/services/todos.service';
import { Observable } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private todoService: TodosService) {}

  todos$!: Observable<Todo[]>;

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

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl(''),
    rememberMe: new FormControl(false),
  });

  onSubmit() {
    console.log('Form values:', this.loginForm.value);
  }
}
