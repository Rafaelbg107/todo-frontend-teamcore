import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

const HomeLayout = () => {

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      justifyContent: 'flex-start',
      width: '100%',
      minHeight: '100%',
    }}>
      <Outlet/>
    </Box>
  )
}

export default HomeLayout