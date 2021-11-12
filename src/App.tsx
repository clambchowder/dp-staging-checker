import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout";
import theme from "./theme/theme";


function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
