import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Todo {
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

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(private http: HttpClient) {}

  httpOptions = {
    headers: {
      'api-key': environment.apiKey,
    },
    withCredentials: true,
  };

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${environment.baseUrl}/todo-lists`, this.httpOptions);
  }

  createTodo(title: string): Observable<BaseResponse<{ item: Todo }>> {
    return this.http.post<BaseResponse<{ item: Todo }>>(
      `${environment.baseUrl}/todo-lists`,
      { title },
      this.httpOptions
    );
  }

  deleteTodo(todoId: string): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(
      `${environment.baseUrl}/todo-lists/${todoId}`,
      this.httpOptions
    );
  }
}
