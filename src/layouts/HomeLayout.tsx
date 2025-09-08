import { Box } from "@mui/material"
import { Outlet } from "react-router-dom"

const HomeLayout = () => {

  return (
    <Box sx={{
      border: '1px solid #9999',
      backgroundColor: '#fff',
      padding: '1rem',
      minHeight: 'calc(100vh - 2.1rem)',
      width: '100%',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    }}>
      <Outlet/>
    </Box>
  )
}

export default HomeLayout