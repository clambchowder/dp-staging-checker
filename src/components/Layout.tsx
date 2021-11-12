import { Container } from "@mui/material";
import StatusGrid from "./StatusGrid";
import HeaderForms from "./HeaderForm";


function Layout() {
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
      <HeaderForms />
      <main style={{flexGrow: 1}}>
        <StatusGrid />
      </main>

  </Container>
  );
}

export default Layout;
