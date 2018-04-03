import { Injectable } from '@angular/core';
import { Todo } from './todo';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class ApiMockService {

  constructor() { }

  public getAllTodos(): Observable<Todo[]> {
    return Observable.of([
      new Todo({id: 1, title: 'Read article', complete: true})
    ]);
  }

  public getTodoByid(id: number): Observable<Todo> {
    return Observable.of(
      new Todo({id: 1, title: 'Read article', complete: true})
    );
  }

  public updateTodo(todo: Todo): Observable<Todo> {
    return Observable.of(
      new Todo({id: 1, title: 'Read article', complete: true})
    );
  }

  public deleteTodoById(id: number): Observable<null> {
    return null;
  }

}
