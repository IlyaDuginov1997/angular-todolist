import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, catchError, EMPTY, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BeautyLoggerService } from 'src/app/services/beauty-logger.service';

export interface Todo {
  id: string;
  title: string;
  addedDate: string;
  order: number;
}

export interface BaseResponse<T = {}> {
  data: T;
  messages: string[];
  fieldsErrors: string[];
  resultCode: number;
}

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient, private beautyLogger: BeautyLoggerService) {}

  httpOptions = {
    headers: {
      'api-key': environment.apiKey,
    },
    withCredentials: true,
  };

  todos$: BehaviorSubject<Todo[]> = new BehaviorSubject<Todo[]>([]);

  getTodos() {
    this.http
      .get<Todo[]>(`${environment.baseUrl}/todo-lists`, this.httpOptions)
      .pipe(catchError(this.errorHandle.bind(this)))
      .subscribe(todos => {
        this.todos$.next(todos);
      });
  }

  createTodo(title: string) {
    return this.http
      .post<BaseResponse<{ item: Todo }>>(
        `${environment.baseUrl}/todo-lists`,
        { title },
        this.httpOptions
      )
      .pipe(
        catchError(this.errorHandle.bind(this)),
        map(res => {
          const newTodo = res.data.item;
          const stateTodos = this.todos$.getValue();
          return [newTodo, ...stateTodos];
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos);
      });
  }

  deleteTodo(todoId: string) {
    return this.http
      .delete<BaseResponse>(`${environment.baseUrl}/todo-lists/${todoId}`, this.httpOptions)
      .pipe(
        catchError(this.errorHandle.bind(this)),
        map(() => {
          return this.todos$.getValue().filter(el => el.id !== todoId);
        })
      )
      .subscribe(todos => {
        this.todos$.next(todos);
      });
  }

  private errorHandle(err: HttpErrorResponse) {
    this.beautyLogger.log(err.message, 'error');
    return EMPTY;
  }
}
