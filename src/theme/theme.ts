import { createTheme } from '@mui/material'

const defaultTheme = createTheme({})

const theme = createTheme({
  typography: {
      allVariants: {
          color: "rgba(0,0,0,.9)",
          fontFamily: [
            '"Segoe UI"',
            '"-apple-system"',
            'BlinkMacSystemFont',
            'Roboto',
            '"Helvetica Neue"',
            'Helvetica',
            'Ubuntu',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"'
          ].join(','),
      },
      h1: {
          fontSize: 22,
          fontWeight: 600,
          marginTop: defaultTheme.spacing(4),
          marginBottom: defaultTheme.spacing(4)
      },
      h2: {
          fontSize: 18,
          fontWeight: 400
      },
      h3: {
          fontSize: 16
      },
      body1: {
          fontSize: 16
      },
      body2: {
          fontSize: 16
      }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "rgb(241 241 241)",
          height: "100vh"
        },
        "#root": {
          height: "100%"
        }
      },
    }
  },
});

export default theme;
