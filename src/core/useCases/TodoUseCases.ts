
import type { Todo, TodoStatus, CreateTodoRequest } from '../domain/Todo'
import { markAsCompleted, markAsPending, updateTodo } from '../domain/Todo'
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

  async updateTodo(id: string, updates: { title?: string; description?: string; dueDate?: Date }): Promise<Todo | null> {
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

    const completedTodo = markAsCompleted(todo)
    return await todoRepository.update(id, completedTodo)
  },

  async pendingTodo(id: string): Promise<Todo | null> {
    const todo = await todoRepository.getById(id)
    if (!todo) {
      throw new Error(`Todo with id ${id} not found`)
    }

    const pendingTodo = markAsPending(todo)
    return await todoRepository.update(id, pendingTodo)
  },

  async deleteTodo(id: string): Promise<boolean | null> {
    return await todoRepository.delete(id)
  },
})