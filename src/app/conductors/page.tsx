"use client";

import { useContext, useEffect, useState } from "react";

import ConductorForm from "../components/forms/conductor-form";
import SearchBar from "../components/search-bar";
import TableInfo from "../components/table-info";

import { MainContextData, myContext } from "@/context/MainContext";
import { ConductorData } from "@/interfaces/types";
import { fetchApi } from "@/utils/api";
import { Box } from "@mui/material";

const headers = {
  id: "ID",
  nome: "Nome",
  numeroHabilitacao: "Número Habilitação",
  categoriaHabilitacao: "Categoria Habilitação",
  vencimentoHabilitacao: "Vencimento Habilitação"
};

function Conductors() {
  const { searchValue, typeFilter, setSearchValue, setTypeFilter, attTables } =
    useContext<MainContextData>(myContext);
  const [conductors, setConductors] = useState<ConductorData[]>([]);
  const [filterConductors, setFilterConductors] = useState<ConductorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi(
        "https://api-deslocamento.herokuapp.com/api/v1/Condutor"
      );
      setConductors(data);
    };

    fetchData();
    setSearchValue("");
    setTypeFilter("");
  }, [attTables]);

  useEffect(() => {
    if (searchValue == "") {
      setFilterConductors([]);
    }
    if (searchValue !== "") {
      const filterConductors = conductors.filter((conductor) => {
        const value = conductor[typeFilter as keyof typeof conductor];
        return value
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilterConductors(filterConductors);
    }
  }, [searchValue]);

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
          Form={ConductorForm}
          data={
            filterConductors.length === 0 && searchValue === ""
              ? conductors
              : filterConductors
          }
        />
      </Box>
    </Box>
  );
}
export default Conductors;
