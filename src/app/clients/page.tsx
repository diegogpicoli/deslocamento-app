"use client";

import { useEffect, useState } from "react";

import SearchBar from "../components/search-bar";
import TableInfo from "../components/table-info";

import { ClientData } from "@/interfaces/types";
import fetchApi from "@/utils/api";
import { Box } from "@mui/material";

function Clients() {
  const [clients, setClients] = useState<ClientData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi(
        "https://api-deslocamento.herokuapp.com/api/v1/Cliente"
      );
      setClients(data);
    };

    fetchData();
  }, []);

  return (
    <Box>
      <SearchBar />

      <Box
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <TableInfo
          headers={[
            "ID",
            "Número Documento",
            "Tipo Documento",
            "Nome",
            "Logradouro",
            "Número",
            "Bairro",
            "Cidade",
            "UF"
          ]}
          data={clients}
        />
      </Box>
    </Box>
  );
}
export default Clients;
