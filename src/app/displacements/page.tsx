"use client";

import { useContext, useEffect, useState } from "react";

import DisplacementForm from "../components/forms/displacement-form";
import SearchBar from "../components/search-bar";
import TableInfo from "../components/table-info";

import { MainContextData, myContext } from "@/context/MainContext";
import { DisplacementsData } from "@/interfaces/types";
import { fetchApi } from "@/utils/api";
import { Box } from "@mui/material";

const headers = {
  id: "ID",
  kmInicial: "Km Inicial",
  kmFinal: "Km Final",
  inicioDeslocamento: "Inicio Deslocamento",
  fimDeslocamento: "Fim do Descolamento",
  checkList: "Check List",
  motivo: "Motivo",
  observacao: "Observação",
  idCondutor: "Id Condutor",
  idVeiculo: "Id Veiculo",
  idCliente: "Id Cliente"
};

function Displacements() {
  const { searchValue, typeFilter, setSearchValue, setTypeFilter, attTables } =
    useContext<MainContextData>(myContext);

  const [displacements, setDisplacements] = useState<DisplacementsData[]>([]);
  const [filterDisplacements, setFilterDisplacements] = useState<
    DisplacementsData[]
  >([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi(
        "https://api-deslocamento.herokuapp.com/api/v1/Deslocamento"
      );
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
