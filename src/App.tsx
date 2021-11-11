import { Container, Typography } from "@mui/material";
import AppVersionGrid from "./components/AppVersionGrid";


function App() {
  return (
    <Container
      maxWidth="lg"
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: 5
      }}
    >
      <header>
        <Typography variant={'h1'} sx={{marginTop: 0, textAlign: 'center'}}>
            DP Staging Checker
        </Typography>
      </header>
      <main style={{flexGrow: 1}}>
        <AppVersionGrid />
      </main>

  </Container>
  );
}

export default App;
