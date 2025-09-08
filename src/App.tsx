import { ThemeProvider } from '@mui/material'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { theme } from '../styles/theme'

function App() {
  const { pathname } = useLocation()

  if (pathname === '/') {
    return <Navigate to='/home' />
  }

  return (
    <main>
      <ThemeProvider theme={theme}>
        <Outlet />
      </ThemeProvider>
    </main>
  )
}

export default App
