import type { Todo, TodoStatus, CreateTodoRequest, UpdateTodoRequest } from '../../core/domain/Todo'
import type { TodoRepository } from '../../core/ports/TodoRepository'
import { useHttpClient } from './useHttpClient'

const endpoint = '/todos'

export const createHttpTodoRepository = (): TodoRepository => {
  const httpClient = useHttpClient()

  return {
    async getAll(): Promise<Todo[]> {
      const response = await httpClient.get<Todo[]>(endpoint)
      return response.data
    },

    async getById(id: string): Promise<Todo | null> {
      try {
        const response = await httpClient.get<Todo>(`${endpoint}/${id}`)
        return response.data
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null
        }
        throw error
      }
    },

    async getAllByStatus(status: TodoStatus): Promise<Todo[]> {
      const response = await httpClient.get<Todo[]>(`${endpoint}/status/${status}`)
      return response.data
    },

    async create(todo: CreateTodoRequest): Promise<Todo> {
      const response = await httpClient.post<Todo>(endpoint, todo)
      return response.data
    },

    async update(id: string, todo: UpdateTodoRequest): Promise<Todo | null> {
      try {
        const response = await httpClient.put<Todo>(`${endpoint}/${id}`, todo)
        return response.data
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null
        }
        throw error
      }
    },

    async delete(id: string): Promise<boolean | null> {
      try {
        const response = await httpClient.delete(`${endpoint}/${id}`)
        // 204 No Content means successful deletion
        return response.status === 204
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null
        }
        throw error
      }
    },

    async markAsComplete(id: string): Promise<Todo | null> {
      try {
        const response = await httpClient.patch<Todo>(`${endpoint}/${id}/complete`)
        return response.data
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null
        }
        throw error
      }
    },

    async markAsPending(id: string): Promise<Todo | null> {
      try {
        const response = await httpClient.patch<Todo>(`${endpoint}/${id}/pending`)
        return response.data
      } catch (error: any) {
        if (error.response?.status === 404) {
          return null
        }
        throw error
      }
    }
  }
}