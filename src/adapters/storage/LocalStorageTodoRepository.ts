import type { Todo, TodoStatus, CreateTodoRequest } from '../../core/domain/Todo'
import type { TodoRepository } from '../../core/ports/TodoRepository'

export const createLocalStorageTodoRepository = (): TodoRepository => {
  const STORAGE_KEY = 'todos'

  const getTodosFromStorage = (): Todo[] => {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : []
    } catch (error) {
      console.error('Error reading from localStorage:', error)
      return []
    }
  }

  const saveTodosToStorage = (todos: Todo[]): void => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
      throw new Error('Failed to save todos to local storage')
    }
  }

  const generateId = (): string => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
  }

  return {
    async getAll(): Promise<Todo[]> {
      return getTodosFromStorage()
    },

    async getAllByStatus(status: TodoStatus): Promise<Todo[]> {
      const todos = getTodosFromStorage()
      return todos.filter(todo => {
        const todoStatus: TodoStatus = todo.completed ? 'complete' : 'pending'
        return todoStatus === status
      })
    },

    async getById(id: string): Promise<Todo | null> {
      const todos = getTodosFromStorage()
      return todos.find(todo => todo.id === id) || null
    },

    async create(todo: CreateTodoRequest): Promise<Todo> {
      const todos = getTodosFromStorage()
      const newTodo: Todo = {
        ...todo,
        id: generateId(),
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      
      todos.push(newTodo)
      saveTodosToStorage(todos)
      return newTodo
    },

    async update(id: string, todo: Partial<Todo>): Promise<Todo> {
      const todos = getTodosFromStorage()
      const index = todos.findIndex(t => t.id === id)
      
      if (index === -1) {
        throw new Error(`Todo with id ${id} not found`)
      }

      const updatedTodo: Todo = {
        ...todos[index],
        ...todo,
        updatedAt: new Date()
      }
      
      todos[index] = updatedTodo
      saveTodosToStorage(todos)
      return updatedTodo
    },

    async delete(id: string): Promise<boolean> {
      const todos = getTodosFromStorage()
      const index = todos.findIndex(t => t.id === id)
      
      if (index === -1) {
        return false
      }

      todos.splice(index, 1)
      saveTodosToStorage(todos)
      return true
    },

    async markAsComplete(id: string): Promise<Todo | null> {
      const todos = getTodosFromStorage()
      const index = todos.findIndex(t => t.id === id)
      
      if (index === -1) {
        return null
      }

      const updatedTodo: Todo = {
        ...todos[index],
        completed: true,
        updatedAt: new Date()
      }
      
      todos[index] = updatedTodo
      saveTodosToStorage(todos)
      return updatedTodo
    },

    async markAsPending(id: string): Promise<Todo | null> {
      const todos = getTodosFromStorage()
      const index = todos.findIndex(t => t.id === id)
      
      if (index === -1) {
        return null
      }

      const updatedTodo: Todo = {
        ...todos[index],
        completed: false,
        updatedAt: new Date()
      }
      
      todos[index] = updatedTodo
      saveTodosToStorage(todos)
      return updatedTodo
    }
  }
}