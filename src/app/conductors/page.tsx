"use client";

import { useContext, useEffect, useState } from "react";

import ConductorForm from "../components/forms/conductor-form";
import SearchBar from "../components/search-bar";
import TableInfo from "../components/table-info";

import { MainContextData, myContext } from "@/context/MainContext";
import { ConductorData } from "@/interfaces/types";
import { deleteApi, fetchApi } from "@/utils/api";
import { formatDate } from "@/utils/functions";
import { Box } from "@mui/material";

const headers = {
  id: "ID",
  nome: "Nome",
  numeroHabilitacao: "Número Habilitação",
  categoriaHabilitacao: "Categoria Habilitação",
  vencimentoHabilitacao: "Vencimento Habilitação"
};

const URL_CONDUCTORS =
  "https://api-deslocamento.herokuapp.com/api/v1/Condutor/";

function Conductors() {
  const {
    searchValue,
    typeFilter,
    setSearchValue,
    setTypeFilter,
    attTables,
    setAttTables
  } = useContext<MainContextData>(myContext);
  const [conductors, setConductors] = useState<ConductorData[]>([]);
  const [filterConductors, setFilterConductors] = useState<ConductorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi(URL_CONDUCTORS);
      return data;
    };

    fetchData().then((data) => {
      const conductors = data.map((conductor: ConductorData) => ({
        ...conductor,
        vencimentoHabilitacao: formatDate(conductor.vencimentoHabilitacao)
      }));
      setConductors(conductors);
    });
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
        if (value) {
          return value
            .toString()
            .toLowerCase()
            .includes(searchValue.toLowerCase());
        }
      });
      setFilterConductors(filterConductors);
    }
  }, [searchValue, attTables]);

  const deleteConductors = async (id: string) => {
    await deleteApi(id, URL_CONDUCTORS).then(() => {
      setAttTables(!attTables);
    });
  };
  console.log(conductors);
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
          deleteData={deleteConductors}
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
