import { useEffect, useState, useRef } from "react"
import { completeTodo, createTodo, deleteTodo, getAllTodos, pendingTodo, updateTodo } from "../../infrastructure/Dependencies"
import { Box, Button, CircularProgress, Typography, Modal, FormGroup, FormControlLabel, Checkbox, Divider } from "@mui/material"
import type { Todo } from "../../core/domain/Todo"
import { generateId } from "../../utils/GeneralUtils";
import TodoItem from "../../components/TodoItem";

const TodoPage = () => {
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
      alert('Failed to load todos')
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
          alert('Failed to create todo')
        }
      } else {
        alert('Title and description are required')
      }
    } catch (error) {
      console.error('Error creating todo:', error)
      alert('Failed to create todo')
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
      alert('Failed to update todo status')
    } finally {
      setLoading(false)
    }
  }

  const fetchUpdateTodo = async (todo: Todo) => {
    try {
      if (todo.title === '' || todo.description === '') {
        alert('Title and description are required')
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
        alert('Failed to update todo')
      }
    } catch (error) {
      console.error('Error updating todo:', error)
      alert('Failed to update todo')
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
        alert('Todo not found')
      } else {
        alert('Failed to delete todo')
      }
    } catch (error) {
      console.error('Error deleting todo:', error)
      alert('Error deleting todo')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Typography
        sx={{
          padding: '10px 20px',
          fontSize: '24px',
          color: '#fff',
          borderRadius: '10px',
          textAlign: 'center',
          fontFamily: 'Roboto, sans-serif',
          backgroundColor: '#4dc0fa',
          width: 'auto',
          border: '1px solid #0002',
        }}
      >
        SPA Todo para TeamCore por Rafael Rodrigo Bustos González
      </Typography>

      <Divider sx={{width: '100%'}} />

      <Box>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={showCompleted} onChange={(e) => setShowCompleted(e.target.checked)} />}
              label="Mostrar completados" 
            />
          </FormGroup>
        </Box>

        {/* Modal Loading Overlay */}
        <Modal
          open={loading}
          closeAfterTransition
          disableEscapeKeyDown
          slotProps={{
            backdrop: {
              sx: { 
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                backdropFilter: 'blur(2px)'
              },
              onClick: (e) => e.stopPropagation()
            }
          }}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              backgroundColor: 'white',
              padding: 4,
              borderRadius: 2,
              boxShadow: 24,
              outline: 'none',
            }}
          >
            <CircularProgress size={40} />
            <Typography variant="h6" color="text.primary">
              {loadingMessage}
            </Typography>
          </Box>
        </Modal>

        <Box 
          ref={containerRef}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              if (todoToEdit) {
                setTodoToEdit(null)
              }
              if (newTodo) {
                setNewTodo(null)
              }
            }
          }}
          sx={{
            width: '50vw',
            border: '1px solid #0009',
            padding: '10px',
            borderRadius: '10px',
            height: '67vh',
            gap: '10px',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            backgroundColor: '#f1f1f1',
          }}
        >
          {/* Scrollable container for TodoItems */}
          <Box
            sx={{
              backgroundColor: '#f1f1f1',
              flex: 1,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              paddingRight: '5px',
              minHeight: 0,
              '&::-webkit-scrollbar': {
                width: '8px',
              },
              '&::-webkit-scrollbar-track': {
                background: '#f1f1f1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb': {
                background: '#c1c1c1',
                borderRadius: '4px',
              },
              '&::-webkit-scrollbar-thumb:hover': {
                background: '#a8a8a8',
              },
            }}
          >
            {
              newTodo && (
                <TodoItem
                  key={newTodo.id}
                  todo={newTodo}
                  onChangeStatus={fetchChangeStatus}
                  todoToEdit={newTodo}
                  onSave={fetchCreateTodo}
                  setTodoToEdit={setNewTodo}
                  isNew={true}
                />
              )
            }
            {
              todos.map((todo) => {
                if (showCompleted || !todo.completed) {
                  return (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onChangeStatus={fetchChangeStatus}
                      todoToEdit={todoToEdit}
                      onSave={fetchUpdateTodo}
                      setTodoToEdit={setTodoToEdit}
                      onDelete={fetchDeleteTodo}
                    />
                  )
                }
              })  
            }
          </Box>

        </Box>
        {/* Create Todo Button - Fixed at bottom */}
        <Button 
          onClick={onNewTodo} 
          disabled={loading}
          sx={{
            marginTop: '10px',
            alignSelf: 'center',
            backgroundColor: '#f0fbfc',
            border: '2px solid #4dc0fa',
            borderRadius: '10px',
            padding: '10px 20px',
            fontSize: '18px',
            color: '#000',
            textTransform: 'none',
            fontWeight: '600px'
          }}
        >
          Crear Tarea
        </Button>
      </Box>

    </Box>
  )
}

export default TodoPage