import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Todo {
  id: string;
  title: string;
  addedDate: string;
  order: number;
}

export interface BaseResponse<T = {}> {
  data: T;
  messages: any[];
  fieldsErrors: any[];
  resultCode: number;
}

@Component({
  selector: 'inst-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss'],
})
export class TodosComponent implements OnInit {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: {
      'api-key': '57c1b71f-e799-4641-88c4-164710395dd0',
    },
    withCredentials: true,
  };

  todos: Todo[] = [];

  ngOnInit(): void {
    this.getTodos();
  }

  getTodos() {
    this.http
      .get<Todo[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', this.httpOptions)
      .subscribe(res => {
        this.todos = res;
      });
  }

  createTodo() {
    const randomNumber = Math.floor(Math.random() * 100);
    const title = 'angular - ' + randomNumber;
    this.http
      .post<BaseResponse<{ item: Todo }>>(
        'https://social-network.samuraijs.com/api/1.1/todo-lists',
        { title },
        this.httpOptions
      )
      .subscribe(res => {
        this.todos.unshift(res.data.item);
      });
  }

  deleteTodo(todoId: string) {
    this.http
      .delete<BaseResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${todoId}`,
        this.httpOptions
      )
      .subscribe(() => {
        this.todos = this.todos.filter(el => el.id !== todoId);
      });
  }
}
