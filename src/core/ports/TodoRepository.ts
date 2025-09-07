import type { Todo, TodoStatus, CreateTodoRequest } from '../domain/Todo'

export interface TodoRepository {
  getAll(): Promise<Todo[]>
  
  getById(id: string): Promise<Todo | null>

  getAllByStatus(status: TodoStatus): Promise<Todo[]>
  
  create(todo: CreateTodoRequest): Promise<Todo>
  
  update(id: string, todo: Partial<Todo>): Promise<Todo | null>
  
  delete(id: string): Promise<boolean | null>
  
  markAsComplete(id: string): Promise<Todo | null>

  markAsPending(id: string): Promise<Todo | null>
}