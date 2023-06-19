"use client";

import { ChangeEvent, useContext, useState } from "react";

import { MainContextData, myContext } from "@/context/MainContext";
import { Box, Button, TextField } from "@mui/material";

function SearchBar() {
  const { setSearchValue } = useContext<MainContextData>(myContext);
  const [value, setValue] = useState<string>("");

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchValue(value);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <TextField
        onChange={handleSearchChange}
        sx={{ width: "50ch" }}
        size="small"
        label="Pesquisar"
      />
      <Button onClick={handleSearchSubmit} type="submit">
        Buscar
      </Button>
    </Box>
  );
}
export default SearchBar;
