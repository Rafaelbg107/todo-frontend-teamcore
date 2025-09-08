import { Box, CircularProgress, Modal, Typography } from "@mui/material"

interface Props {
  loading: boolean
  loadingMessage: string
}

const Loading = ({ loading, loadingMessage }: Props) => {

  return (
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
  )
}

export default Loading
