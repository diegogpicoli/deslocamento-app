"use client";

import { useContext, useEffect, useState } from "react";

import ClientForm from "../components/forms/client-form";
import SearchBar from "../components/search-bar";
import TableInfo from "../components/table-info";

import { MainContextData, myContext } from "@/context/MainContext";
import { ClientData } from "@/interfaces/types";
import { fetchApi } from "@/utils/api";
import { Box } from "@mui/material";

const headers = {
  id: "ID",
  numeroDocumento: "Número Documento",
  tipoDocumento: "Tipo Documento",
  nome: "Nome",
  logradouro: "Logradouro",
  numero: "Número",
  bairro: "Bairro",
  cidade: "Cidade",
  uf: "UF"
};

function Clients() {
  const { searchValue, typeFilter, setSearchValue, setTypeFilter, attTables } =
    useContext<MainContextData>(myContext);

  const [clients, setClients] = useState<ClientData[]>([]);
  const [filterClients, setFilterClients] = useState<ClientData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi(
        "https://api-deslocamento.herokuapp.com/api/v1/Cliente"
      );
      setClients(data);
    };

    fetchData();
    setSearchValue("");
    setTypeFilter("");
  }, [attTables]);

  useEffect(() => {
    if (searchValue == "") {
      setFilterClients([]);
    }
    if (searchValue !== "") {
      const filterClients = clients.filter((client) => {
        const value = client[typeFilter as keyof typeof client];
        return value
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilterClients(filterClients);
    }
  }, [searchValue, attTables]);

  return (
    <Box>
      <SearchBar filtros={headers} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <TableInfo
          headers={Object.values(headers)}
          Form={ClientForm}
          data={
            filterClients.length === 0 && searchValue === ""
              ? clients
              : filterClients
          }
        />
      </Box>
    </Box>
  );
}
export default Clients;
