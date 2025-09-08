import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#019df4',
        },
        secondary: {
            main: '#68CD18',
        },
        info: {
            main: '#d1d1d1',
        },

        background: {
            default: '#f5f5f5',
        },
    },
    typography: {
        subtitle1: {
            fontSize: '36px',
            color: '#019df4',
            fontWeight: '500',
        },
    },
})