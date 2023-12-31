"use client";

import { useContext, useEffect, useState } from "react";

import DisplacementForm from "../components/forms/displacement-form";
import SearchBar from "../components/search-bar";
import TableDisplacements from "../components/table-displacements";
import TableInfo from "../components/table-info";

import { MainContextData, myContext } from "@/context/MainContext";
import { DisplacementsData } from "@/interfaces/types";
import { deleteApi, fetchApi } from "@/utils/api";
import { Box } from "@mui/material";

const headers = {
  id: "ID",
  kmInicial: "Km Inicial",
  kmFinal: "Km Final",
  inicioDeslocamento: "Data Inicial",
  fimDeslocamento: "Data Final",
  checkList: "Check List",
  motivo: "Motivo",
  observacao: "Observação",
  idCondutor: "Condutor",
  idVeiculo: "Veiculo",
  idCliente: "Cliente"
};

const URL_DISPLACEMENTS =
  "https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/";

function Displacements() {
  const {
    searchValue,
    typeFilter,
    setSearchValue,
    setTypeFilter,
    attTables,
    setAttTables
  } = useContext<MainContextData>(myContext);

  const [displacements, setDisplacements] = useState<DisplacementsData[]>([]);
  const [filterDisplacements, setFilterDisplacements] = useState<
    DisplacementsData[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi(URL_DISPLACEMENTS);
      setDisplacements(data);
    };

    fetchData();
    setSearchValue("");
    setTypeFilter("");
  }, [attTables]);

  useEffect(() => {
    if (searchValue == "") {
      setFilterDisplacements([]);
    }
    if (searchValue !== "") {
      const filterDisplacements = displacements.filter((displacement) => {
        const value = displacement[typeFilter as keyof typeof displacement];
        return (
          value &&
          value.toString().toLowerCase().includes(searchValue.toLowerCase())
        );
      });
      setFilterDisplacements(filterDisplacements);
    }
  }, [searchValue, attTables]);

  const deleteDisplacements = async (id: string) => {
    await deleteApi(id, URL_DISPLACEMENTS).then(() => {
      setAttTables(!attTables);
    });
  };

  return (
    <Box>
      <SearchBar filtros={headers} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <TableDisplacements
          deleteData={deleteDisplacements}
          headers={Object.values(headers)}
          Form={DisplacementForm}
          data={
            filterDisplacements.length === 0 && searchValue === ""
              ? displacements
              : filterDisplacements
          }
        />
      </Box>
    </Box>
  );
}
export default Displacements;
