import { Container, Typography } from "@mui/material";
import AppVersions from "./components/AppVersions";


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
        <Typography variant={'h1'} sx={{marginTop: 0}} >
          DP Staging Checker
        </Typography>
      </header>
      <main style={{flexGrow: 1}}>
        <AppVersions />
      </main>

  </Container>
  );
}

export default App;
