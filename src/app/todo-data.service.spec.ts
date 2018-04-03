import { TestBed, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { TodoDataService } from './todo-data.service';
import { Todo } from './todo';

describe('TodoDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TodoDataService]
    });
  });

  it('should be created', inject([TodoDataService], (service: TodoDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('#getAllTodos()', () => {
    it('should return an empty array by default', inject([TodoDataService], (service: TodoDataService) => {
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should return all todos', inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Todo 1', complete: false});
      const todo2 = new Todo({title: 'Todo 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  describe('#save(todo)', () => {
    it('should automatically assign an incrementing id', inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Todo 1', complete: false});
      const todo2 = new Todo({title: 'Todo 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getTodoById(1)).toEqual(todo1);
      expect(service.getTodoById(2)).toEqual(todo2);
    }));
  });

  describe('#deleteTodoById(id)', () => {
    it('should remove todo with the corresponding id', inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Todo 1', complete: false});
      const todo2 = new Todo({title: 'Todo 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTotoById(1);
      expect(service.getAllTodos()).toEqual([todo2]);
      service.deleteTotoById(2);
      expect(service.getAllTodos()).toEqual([]);
    }));

    it('should not removing anything if todo with corresponding id is not found', inject([TodoDataService], (service: TodoDataService) => {
      const todo1 = new Todo({title: 'Todo 1', complete: false});
      const todo2 = new Todo({title: 'Todo 2', complete: true});
      service.addTodo(todo1);
      service.addTodo(todo2);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
      service.deleteTotoById(3);
      expect(service.getAllTodos()).toEqual([todo1, todo2]);
    }));
  });

  describe('#updateTodoById(id)', () => {
    it('should return todo with the corresponding id and updated data', inject([TodoDataService], (service: TodoDataService) => {
      const todo = new Todo({title: 'Todo 1', complete: false});
      service.addTodo(todo);
      const updatedTodo = service.updateTodoById(1, {
        title: 'Todo 1 edited'
      });
      expect(todo.title).toEqual('Todo 1 edited');
    }));

    it('should return null if todo is not found', inject([TodoDataService], (service: TodoDataService) => {
      const todo = new Todo({title: 'Todo 1', complete: false});
      service.addTodo(todo);
      const updatedTodo = service.updateTodoById(2, {
        title: 'Todo 1 edited'
      });
      expect(updatedTodo).toEqual(null);
    }));
  });

  describe('#toggleComplete(todo)', () => {
    it('#should return the updated todo with inverse complete status', inject([TodoDataService], (service: TodoDataService) => {
      const todo = new Todo({title: 'Todo 1', complete: false});
      service.addTodo(todo);
      const updatedTodo = service.toggleTodoComplete(todo);
      expect(updatedTodo.complete).toEqual(true);
      service.toggleTodoComplete(todo);
      expect(updatedTodo.complete).toEqual(false);
    }));
  });
});
