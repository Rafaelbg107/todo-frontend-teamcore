
import type { Todo, TodoStatus, CreateTodoRequest, UpdateTodoRequest } from '../domain/Todo'
import { updateTodo } from '../domain/Todo'
import type { TodoRepository } from '../ports/TodoRepository'

export const createTodoUseCases = (todoRepository: TodoRepository) => ({
  async getAllTodos(): Promise<Todo[]> {
    return await todoRepository.getAll()
  },

  async getTodoById(id: string): Promise<Todo | null> {
    return await todoRepository.getById(id)
  },

  async getTodosByStatus(status: TodoStatus): Promise<Todo[]> {
    return await todoRepository.getAllByStatus(status)
  },

  async createTodo(request: CreateTodoRequest): Promise<Todo> {
    return await todoRepository.create(request)
  },

  async updateTodo(id: string, updates: UpdateTodoRequest): Promise<Todo | null> {
    const existingTodo = await todoRepository.getById(id)
    if (!existingTodo) {
      throw new Error(`Todo with id ${id} not found`)
    }

    const updatedTodo = updateTodo(existingTodo, updates)
    return await todoRepository.update(id, updatedTodo)
  },

  async completeTodo(id: string): Promise<Todo | null> {
    const todo = await todoRepository.getById(id)
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`)
    }

    return await todoRepository.markAsComplete(id)
  },

  async pendingTodo(id: string): Promise<Todo | null> {
    const todo = await todoRepository.getById(id)
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`)
    }

    return await todoRepository.markAsPending(id)
  },

  async deleteTodo(id: string): Promise<boolean | null> {
    return await todoRepository.delete(id)
  },
})