"use client";

import { useEffect, useState } from "react";

import SearchBar from "../components/search-bar";
import TableInfo from "../components/table-info";

import { DisplacementsData } from "@/interfaces/types";
import fetchApi from "@/utils/api";
import { Box } from "@mui/material";

const headers = [
  "ID",
  "Km Inicial",
  "Km Final",
  "Inicio Deslocamento",
  "Fim do Descolamento",
  "Check List",
  "Motivo",
  "Observação",
  "Id Condutor",
  "Id Veiculo",
  "Id Cliente"
];

function Displacements() {
  const [vehicles, setVehicles] = useState<DisplacementsData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi(
        "https://api-deslocamento.herokuapp.com/api/v1/Deslocamento"
      );
      setVehicles(data);
    };

    fetchData();
  }, []);

  return (
    <Box>
      <SearchBar filtros={headers} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <TableInfo headers={headers} data={vehicles} />
      </Box>
    </Box>
  );
}
export default Displacements;
