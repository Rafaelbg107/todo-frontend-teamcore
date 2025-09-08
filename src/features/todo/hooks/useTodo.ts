import { useEffect, useState, useRef } from "react"
import { completeTodo, createTodo, deleteTodo, getAllTodos, pendingTodo, updateTodo } from "../../../infrastructure/Dependencies"
import type { Todo } from "../../../core/domain/Todo"
import { generateId } from "../../../utils/GeneralUtils";

const useTodo = () => {

  const [todos, setTodos] = useState<Todo[]>([])
  const [todoToEdit, setTodoToEdit] = useState<Todo | null>(null)
  const [newTodo, setNewTodo] = useState<Todo | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('Loading...')
  const containerRef = useRef<HTMLDivElement>(null)
  const [showCompleted, setShowCompleted] = useState(false)

  useEffect(() => {
    fetchAllTodos()
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        if (todoToEdit) {
          setTodoToEdit(null)
        }
        if (newTodo) {
          setNewTodo(null)
        }
      }
    }

    if (todoToEdit || newTodo) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [todoToEdit, newTodo])

  const fetchAllTodos = async () => {
    try {
      setLoadingMessage('Loading todos...')
      setLoading(true)
      const response = await getAllTodos()
      setTodos(response)
    } catch (error) {
      console.error('Error fetching todos:', error)
      alert('Error al cargar los todos')
    } finally {
      setLoading(false)
    }
  }

  const onNewTodo = () => {
    setNewTodo({
      id: generateId(),
      title: '',
      description: '',
      dueDate: new Date(),
      completed: false,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }

  const fetchCreateTodo = async () => {
    try {
      if (newTodo && newTodo.title && newTodo.description && newTodo.dueDate) {
        setLoadingMessage('Creating todo...')
        setLoading(true)
        const todoCreated = await createTodo({
          title: newTodo.title,
          description: newTodo.description,
          dueDate: newTodo.dueDate
        })
        
        if (todoCreated) {
          console.log('createTodo', todoCreated)
          setTodos(todos => [...todos, todoCreated])
          setNewTodo(null)
        } else {
          alert('Error al crear todo')
        }
      } else {
        alert('El título y la descripción son requeridos')
      }
    } catch (error) {
      console.error('Error creating todo:', error)
      alert('Error al crear todo')
    } finally {
      setLoading(false)
    }
  }

  const fetchChangeStatus = async (todo: Todo) => {
    try {
    
      setTodos(todos.map((data) => data.id === todo.id ? { ...data, completed: !data.completed } : data))

      setLoadingMessage(todo.completed ? 'Marking as pending...' : 'Marking as complete...')
      setLoading(true)

      if (todo.completed) {
        console.log('pendingTodo', todo.id, todo.completed)
        const response = await pendingTodo(todo.id)
        console.log('response', response)
      } else {
        console.log('completeTodo', todo.id)
        const response = await completeTodo(todo.id)
        console.log('response', response)
      }

    } catch (error) {
      console.error('Error changing todo status:', error)
    
      setTodos(todos.map((data) => data.id === todo.id ? { ...data, completed: !data.completed } : data))
      alert('Error al actualizar el estado del todo')
    } finally {
      setLoading(false)
    }
  }

  const fetchUpdateTodo = async (todo: Todo) => {
    try {
      if (todo.title === '' || todo.description === '') {
        alert('El título y la descripción son requeridos')
        return
      }

      setLoadingMessage('Updating todo...')
      setLoading(true)
      const todoUpdate = await updateTodo(todo.id, todo)

      if (todoUpdate) {
        setTodos(todos => todos.map((t) => (
          t.id === todo?.id ? todoUpdate : t
        )))
        setTodoToEdit(null)
        console.log('Todo updated successfully')
      } else {
        alert('Error al actualizar todo')
      }
    } catch (error) {
      console.error('Error updating todo:', error)
      alert('Error al actualizar todo')
    } finally {
      setLoading(false)
    }
  }

  const fetchDeleteTodo = async (id: string) => {
    try {
      setLoadingMessage('Deleting todo...')
      setLoading(true)
      const todoDeleted = await deleteTodo(id)
      console.log('deleteTodo result:', todoDeleted)
      
      if (todoDeleted === true) {
        setTodos(todos => todos.filter((t) => t.id !== id))
        console.log('Todo deleted successfully')
      } else if (todoDeleted === null) {
        alert('Todo no encontrado')
      } else {
        alert('Error al eliminar todo')
      }
    } catch (error) {
      alert('Error al eliminar todo')
    } finally {
      setLoading(false)
    }
  }

  return {
    showCompleted,
    loading,
    loadingMessage,
    containerRef,
    newTodo,
    todos,
    todoToEdit,
    setShowCompleted,
    setTodoToEdit,
    setNewTodo,
    fetchChangeStatus,
    fetchCreateTodo,
    fetchUpdateTodo,
    fetchDeleteTodo,
    onNewTodo,
  }
}

export default useTodo