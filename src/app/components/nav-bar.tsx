"use client";

import Link from "next/link";

import { Avatar } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

function NavBar() {
  return (
    <AppBar sx={{ maxWidth: "1300px" }} position="static">
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
        <Link href="/cliente">
          <Button color="inherit">Cliente</Button>
        </Link>
        <Link href="/condutor">
          <Button color="inherit">Condutor</Button>
        </Link>
        <Link href="/deslocamento">
          <Button color="inherit">Deslocamento</Button>
        </Link>
        <Link href="/veiculo">
          <Button color="inherit">Veiculo</Button>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
export default NavBar;
