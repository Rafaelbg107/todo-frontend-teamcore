export const todoPageContainerStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
}

export const todoPageTitleStyles = {
  padding: '10px 20px',
  fontSize: '24px',
  color: '#0b5690',
  borderRadius: '10px',
  textAlign: 'center',
  width: 'auto',
}

export const todosContainerStyles = {
  width: '50vw',
  border: '1px solid #0009',
  padding: '10px',
  borderRadius: '10px',
  height: '67vh',
  gap: '10px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  '@media (max-width: 1280px)': {
    width: '80vw',
  },
}

export const scrollableContainerStyles = {
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
};

export const createTodoButtonStyles = {
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
}

export const todosContainerCommonStyles = {
  backgroundColor: '#e0e0e0',
}