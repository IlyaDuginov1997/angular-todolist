import { Component, OnInit } from '@angular/core';
import { Todo, TodosService } from 'src/app/services/todos.service';

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private todoService: TodosService) {}

  todos: Todo[] = [];

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.todoService.getTodos().subscribe(res => {
      this.todos = res;
    });
  }

  createTodo() {
    const randomNumber = Math.floor(Math.random() * 100);
    const title = 'angular - ' + randomNumber;
    this.todoService.createTodo(title).subscribe(res => {
      this.todos.unshift(res.data.item);
    });
  }

  deleteTodo(todoId: string) {
    this.todoService.deleteTodo(todoId).subscribe(() => {
      this.todos = this.todos.filter(el => el.id !== todoId);
    });
  }
}
