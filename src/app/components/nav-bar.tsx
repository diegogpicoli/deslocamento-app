"use client";

import Link from "next/link";

import { Avatar, Box } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function NavBar() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <AppBar sx={{ maxWidth: "1400px" }} position="static">
        <Toolbar
          sx={{
            backgroundColor: "white",
            justifyContent: "space-between"
          }}
        >
          <Typography variant="h6" component="div">
            <Link href="/">
              <Avatar
                sx={{ width: 80, height: 80 }}
                alt="Logo"
                src="/images/logo.png"
              />
            </Link>
          </Typography>
          <Link href="/clients">
            <Button color="inherit">Cliente</Button>
          </Link>
          <Link href="/conductors">
            <Button color="inherit">Condutor</Button>
          </Link>
          <Link href="/displacements">
            <Button color="inherit">Deslocamento</Button>
          </Link>
          <Link href="/vehicles">
            <Button color="inherit">Veiculo</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default NavBar;
