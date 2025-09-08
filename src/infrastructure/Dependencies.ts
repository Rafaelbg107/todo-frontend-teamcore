import { createHttpTodoRepository } from '../adapters/http/HttpTodoRepository'
import { createTodoUseCases } from '../core/useCases/TodoUseCases'
import type { CreateTodoRequest, UpdateTodoRequest } from '../core/domain/Todo'

const todoRepository = createHttpTodoRepository()

export const todoUseCases = createTodoUseCases(todoRepository)

export { todoRepository }
export type { CreateTodoRequest, UpdateTodoRequest }

export const {
  getAllTodos,
  getTodosByStatus,
  getTodoById,
  createTodo,
  updateTodo,
  completeTodo,
  pendingTodo,
  deleteTodo
} = todoUseCases