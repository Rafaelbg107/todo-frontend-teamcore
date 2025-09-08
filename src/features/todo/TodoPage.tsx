import { Box, Button, Typography, FormGroup, FormControlLabel, Checkbox, Divider } from "@mui/material"
import TodoItem from "./components/TodoItem";
import useTodo from "./hooks/useTodo";
import Loading from "../../components/Loading";
import {
  createTodoButtonStyles,
  scrollableContainerStyles,
  todoPageContainerStyles,
  todoPageTitleStyles,
  todosContainerCommonStyles,
  todosContainerStyles
} from "./styles/TodoStyles";

const TodoPage = () => {

  const {
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
  } = useTodo()

  return (
    <Box
      sx={todoPageContainerStyles}
    >
      <Typography
        sx={todoPageTitleStyles}
      >
        SPA Todo para TeamCore por Rafael Rodrigo Bustos González
      </Typography>

      <Divider sx={{width: '100%'}} />

      <Box>
        <Box sx={{display: 'flex', justifyContent: 'flex-end', width: '100%'}}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox checked={showCompleted} onChange={(e) => setShowCompleted(e.target.checked)} size="small"/>}
              label="Mostrar completados"
              sx={{
                '& .MuiFormControlLabel-label': {
                  fontSize: '14px',
                },
                '& .MuiCheckbox-root': {
                  padding: '8px 4px',
                }
              }}
            />
          </FormGroup>
        </Box>

        <Box 
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
          sx={[todosContainerStyles, todosContainerCommonStyles]}
        >
          <Box sx={[scrollableContainerStyles, todosContainerCommonStyles]} ref={containerRef}>
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
        <Button 
          onClick={onNewTodo} 
          disabled={loading}
          sx={createTodoButtonStyles}
        >
          Crear Tarea
        </Button>
      </Box>

      <Loading loading={loading} loadingMessage={loadingMessage} />
    </Box>
  )
}

export default TodoPage