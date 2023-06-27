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
      <AppBar
        sx={{
          backgroundColor: "white",
          height: "100px",
          display: "flex",
          justifyContent: "center"
        }}
        position="static"
      >
        <Toolbar
          sx={{
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
          <Link href="/clients" style={{ textDecoration: "none" }}>
            <Box
              color="inherit"
              sx={{
                borderBottom: "2px solid transparent",
                "&:hover": { borderBottom: "2px solid black" }
              }}
            >
              Clientes
            </Box>
          </Link>
          <Link href="/conductors" style={{ textDecoration: "none" }}>
            <Box
              color="inherit"
              sx={{
                borderBottom: "2px solid transparent",
                "&:hover": { borderBottom: "2px solid black" }
              }}
            >
              Condutores
            </Box>
          </Link>
          <Link href="/displacements" style={{ textDecoration: "none" }}>
            <Box
              color="inherit"
              sx={{
                borderBottom: "2px solid transparent",
                "&:hover": { borderBottom: "2px solid black" }
              }}
            >
              Deslocamentos
            </Box>
          </Link>
          <Link href="/vehicles" style={{ textDecoration: "none" }}>
            <Box
              color="inherit"
              sx={{
                borderBottom: "2px solid transparent",
                "&:hover": { borderBottom: "2px solid black" }
              }}
            >
              Veículos
            </Box>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
export default NavBar;
