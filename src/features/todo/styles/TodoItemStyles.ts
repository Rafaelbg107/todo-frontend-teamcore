export const todoItemContainerStyles = {
  display: 'flex',
  border: '1px solid #000',
  padding: '15px 30px',
  borderRadius: '10px',
  alignItems: 'center',
  gap: '10px',
  overflow: 'hidden',
  minHeight: 'fit-content',
  flexShrink: 0,
}

export const todoItemTitleStyles = {
  width: '70%',
  '& .MuiInputBase-input': {
    fontSize: '18px',
    fontWeight: 'bold'
  },
}

export const todoItemTitleDisabledStyles = {     
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
}

export const todoItemDescriptionStyles = {
  width: 'auto',
  fontSize: '8px',
  '& .MuiInputBase-input': {
    color: 'black',
    WebkitTextFillColor: 'black',
    fontSize: '12px',
  },
}

export const todoItemDescriptionDisabledStyles = {
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
}