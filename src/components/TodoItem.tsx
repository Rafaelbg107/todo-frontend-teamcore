import { Box, Checkbox, Divider, TextField, useMediaQuery } from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';
import WarningIcon from '@mui/icons-material/Warning';
import type { Todo } from "../core/domain/Todo";

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
      sx={{
        display: 'flex',
        border: '1px solid #000',
        padding: '15px 30px',
        borderRadius: '10px',
        alignItems: 'center',
        gap: '10px',
        overflow: 'hidden',
        minHeight: 'fit-content',
        flexShrink: 0,
        backgroundColor: (new Date(todo.dueDate) < new Date() && !todo.completed) ? '#ffdada' : '#fff',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          width: '600px'
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
              { width: '70%',
                '& .MuiInputBase-input': {
                  fontSize: '18px',
                  fontWeight: 'bold'
                },
              }, 
              todoToEdit?.id !== todo.id ? {
              
                '& .MuiInputBase-input.Mui-disabled': {
                  color: 'black',
                  WebkitTextFillColor: 'black',
                },
                '& .MuiInput-underline:before': {
                  borderBottom: 'none',
                },
                '& .MuiInput-underline:after': {
                  borderBottom: 'none',
                },
                '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                  borderBottom: 'none',
                },
                '& .MuiInput-underline.Mui-disabled:before': {
                  borderBottom: 'none',
                },
              } : {}]}
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
            {width: 'auto', fontSize: '8px'}, 
            todoToEdit?.id !== todo.id ? {
            
              '& .MuiInputBase-input.Mui-disabled': {
                color: 'black',
                WebkitTextFillColor: 'black',
                fontSize: '12px',
              },
              '& .MuiInput-underline:before': {
                borderBottom: 'none',
              },
              '& .MuiInput-underline:after': {
                borderBottom: 'none',
              },
              '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                borderBottom: 'none',
              },
              '& .MuiInput-underline.Mui-disabled:before': {
                borderBottom: 'none',
              },
            } : {
              '& .MuiInputBase-input': {
                color: 'black',
                WebkitTextFillColor: 'black',
                fontSize: '12px',
              },
            }]}
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
        <Checkbox checked={todo.completed} onClick={() => onChangeStatus(todo)} disabled={todoToEdit?.id === todo.id || isNew}/>
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
