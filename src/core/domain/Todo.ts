export interface Todo {
  id: string
  title: string
  description: string
  dueDate: Date
  completed: boolean
  createdAt: Date
  updatedAt: Date
}

export type TodoStatus = 'pending' | 'complete'

// Interface for creating a new todo
export interface CreateTodoRequest {
  title: string
  description: string
  dueDate: Date
}

export interface UpdateTodoRequest {
  title?: string
  description?: string
  dueDate?: Date
}

export const markAsCompleted = (todo: Todo): Todo => ({
  ...todo,
  completed: true,
  updatedAt: new Date()
})

export const markAsPending = (todo: Todo): Todo => ({
  ...todo,
  completed: false,
  updatedAt: new Date()
})

export const updateTodo = (todo: Todo, updates: Partial<Pick<Todo, 'title' | 'description' | 'dueDate'>>): Todo => ({
  ...todo,
  ...updates,
  updatedAt: new Date()
})
