import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import CollapsibleTable from "./components/CollapsibleTable";
import NavBar from "./components/NavBar";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://btawaifi.github.io/">
        BTawaifi
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
}

export default function App() {
  return (
    <Container maxWidth="md">
      <NavBar />
      <Box sx={{ my: 4 }}>
        <CollapsibleTable />
      </Box>
      <Copyright />
    </Container>
  );
}
