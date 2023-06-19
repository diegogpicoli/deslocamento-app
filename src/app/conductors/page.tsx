"use client";

import { useEffect, useState } from "react";

import SearchBar from "../components/search-bar";
import TableInfo from "../components/table-info";

import { ConductorData } from "@/interfaces/types";
import fetchApi from "@/utils/api";
import { Box } from "@mui/material";

const filtros = [
  "ID",
  "Nome",
  "Número Habilitação",
  "Categoria Habilitação",
  "Vencimento Habilitação"
];

function Conductors() {
  const [conductors, setConductors] = useState<ConductorData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi(
        "https://api-deslocamento.herokuapp.com/api/v1/Condutor"
      );
      setConductors(data);
    };

    fetchData();
  }, []);
  return (
    <Box>
      <SearchBar filtros={filtros} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <TableInfo headers={filtros} data={conductors} />
      </Box>
    </Box>
  );
}
export default Conductors;
