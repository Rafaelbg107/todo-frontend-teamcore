import { Box, Checkbox, Divider, TextField, useMediaQuery } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import type { Todo } from "../../../core/domain/Todo";
import {
  todoItemContainerStyles,
  todoItemDescriptionDisabledStyles,
  todoItemDescriptionStyles,
  todoItemTitleDisabledStyles,
  todoItemTitleStyles
} from "../styles/TodoItemStyles";

interface Props {
  todo: Todo
  todoToEdit: Todo | null
  onChangeStatus: (todo: Todo) => void
  onSave: (todo: Todo) => void
  setTodoToEdit: (todo: Todo) => void
  onDelete?: (id: string) => void
  isNew?: boolean
}

const TodoItem = ({
  todo,
  todoToEdit,
  isNew,
  onChangeStatus,
  onSave,
  setTodoToEdit,
  onDelete
}: Props) => {

  const isSmallScreen = useMediaQuery('(max-width: 1000px)');

  return (
    <Box
      key={todo.id}
      sx={[todoItemContainerStyles, {backgroundColor: (new Date(todo.dueDate) < new Date() && !todo.completed) ? '#ffdada' : '#fff'}]}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          flexGrow: 1,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isSmallScreen ? 'column' : 'row',
            gap: '10px',
            width: 'auto',
            alignItems: isSmallScreen ? 'flex-start' : 'center',
            justifyContent: isSmallScreen ? 'flex-start' : 'space-between'
          }}
        >
          <TextField
            multiline
            id="standard-basic"
            variant="standard"
            value={todoToEdit?.id !== todo.id ? todo.title : todoToEdit.title}
            onChange={(e) => setTodoToEdit({...todo, title: e.target.value})}
            disabled={todoToEdit?.id !== todo.id}
            sx={[
              todoItemTitleStyles, 
              todoToEdit?.id !== todo.id ?  todoItemTitleDisabledStyles : {}
            ]}
            error={!todo.title}
            helperText={!todo.title ? "El título es requerido" : ""}
          />
          <Box
            sx={{
              display: 'flex',
              gap: '2px',
              alignItems: 'center',
            }}
          >
            {
              (new Date(todo.dueDate) < new Date() && !todo.completed) && (
                <WarningIcon sx={{fontSize: '12px', color: "#d12828"}}/>
              )
            }
            <input
              type="datetime-local"
              value={todoToEdit?.id !== todo.id 
                ? new Date(todo.dueDate).toLocaleString('sv-SE').slice(0, 16)
                : new Date(todoToEdit.dueDate).toLocaleString('sv-SE').slice(0, 16)
              }
              onChange={(e) => {
                if (e.target.value) {
                  setTodoToEdit({...todo, dueDate: new Date(e.target.value)})
                }
              }}
              disabled={todoToEdit?.id !== todo.id}
              style={{
                fontSize: '12px',
                border: 'none',
                outline: 'none',
                backgroundColor: 'transparent',
                color: 'black',
                width: 'auto',
                fontFamily: 'inherit',
              }}
            />
            
          </Box>
        </Box>
        <TextField
          multiline
          id="standard-basic"
          variant="standard"
          value={todoToEdit?.id !== todo.id ? todo.description : todoToEdit.description}
          onChange={(e) => setTodoToEdit({...todo, description: e.target.value})}
          disabled={todoToEdit?.id !== todo.id}
          sx={[
            todoItemDescriptionStyles, 
            todoToEdit?.id !== todo.id ? todoItemDescriptionDisabledStyles : {}
          ]}
          error={!todo.description}
          helperText={!todo.description ? "La descripción es requerida" : ""}
        />
      </Box>
      <Divider orientation="vertical" flexItem />
      <Box 
        sx={{
          display: 'flex',
          gap: '10px',
          width: 'auto',
          alignItems: 'center'
        }}
      >
        <Checkbox checked={todo.completed} onClick={() => onChangeStatus(todo)} disabled={todoToEdit?.id === todo.id || isNew}
          sx={{
            paddingRight: 0,
          }}  
        />
        {
          todoToEdit?.id === todo.id ? 
            <SaveIcon onClick={() => onSave(todoToEdit)} sx={{cursor: 'pointer'}}/>
            : 
            <EditIcon onClick={() => setTodoToEdit(todo)} sx={{cursor: 'pointer'}}/>
        }
        {
          onDelete && (
            <DeleteIcon onClick={() => onDelete(todo.id)} sx={{cursor: 'pointer', color: '#d12828'}}/>
          )
        }
      </Box>
    </Box>
  )
}

export default TodoItem
