"use client";

import { useEffect, useState } from "react";

import TableInfo from "../components/table-info";

import { DisplacementsData } from "@/interfaces/types";
import fetchApi from "@/utils/api";
import { Box } from "@mui/material";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <TableInfo
        headers={[
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
        ]}
        data={vehicles}
      />
    </Box>
  );
}
export default Displacements;
