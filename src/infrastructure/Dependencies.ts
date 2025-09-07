import { createHttpTodoRepository } from '../adapters/http/HttpTodoRepository'
import { createTodoUseCases } from '../core/useCases/TodoUseCases'
import type { CreateTodoRequest } from '../core/domain/Todo'

const todoRepository = createHttpTodoRepository()

export const todoUseCases = createTodoUseCases(todoRepository)

export { todoRepository }
export type { CreateTodoRequest }

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