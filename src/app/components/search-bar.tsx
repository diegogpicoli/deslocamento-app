"use client";

import { useContext, useEffect, useState } from "react";

import { MainContextData, myContext } from "@/context/MainContext";
import { Box, Button, MenuItem, Select, TextField } from "@mui/material";

function SearchBar({ filtros }: { filtros: Record<string, string> }) {
  const { setSearchValue, setTypeFilter } =
    useContext<MainContextData>(myContext);
  const [selectedOption, setSelectedOption] = useState("msg");
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    setTypeFilter(selectedOption);
  }, [selectedOption]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearchValue(value);
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <Select
        sx={{ width: 300 }}
        size="small"
        value={selectedOption}
        onChange={(event) => setSelectedOption(event.target.value)}
      >
        <MenuItem value="msg" disabled>
          Escolha um filtro
        </MenuItem>
        {Object.keys(filtros).map((filtro, index) => (
          <MenuItem key={index} value={filtro}>
            {filtros[filtro]}
          </MenuItem>
        ))}
      </Select>
      <TextField
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
        sx={{ width: "50ch" }}
        size="small"
        label="Pesquisar"
      />
      <Button onClick={() => setSearchValue(value)} type="submit">
        Buscar
      </Button>
    </Box>
  );
}
export default SearchBar;
