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
        html: {
          scrollbarGutter: 'stable'
        },
        body: {
          backgroundColor: "rgb(241 241 241)",
          height: "100vh",
          paddingRight: "0 !important", // select dropdown shifts body layout
          scrollbarGutter: 'stable'
        },
        "#root": {
          height: "100%"
        },
        "@media (prefers-reduced-motion: reduce)": {
          "& *": {
            animationDuration: "0.001ms !important",
            animationIterationCount: "1 !important",
            transitionDuration: "0.001ms !important"
          }
        }
      },
    }
  },
});

export default theme;
