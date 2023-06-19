"use client";

import { useEffect, useState } from "react";

import TableInfo from "../components/table-info";

import { ConductorData } from "@/interfaces/types";
import fetchApi from "@/utils/api";
import { Box } from "@mui/material";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <TableInfo
        headers={[
          "ID",
          "Nome",
          "Número Habilitação",
          "Categoria Habilitação",
          "Vencimento Habilitação"
        ]}
        data={conductors}
      />
    </Box>
  );
}
export default Conductors;
