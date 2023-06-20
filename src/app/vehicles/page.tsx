"use client";

import { useContext, useEffect, useState } from "react";

import ConductorForm from "../components/forms/displacement-form";
import SearchBar from "../components/search-bar";
import TableInfo from "../components/table-info";

import { MainContextData, myContext } from "@/context/MainContext";
import { VehiclesData } from "@/interfaces/types";
import { fetchApi } from "@/utils/api";
import { Box } from "@mui/material";

const headers = {
  id: "ID",
  placa: "Placa",
  marcaModelo: "Modelo",
  anoFabricacao: "Fabricação",
  kmAtual: "Quilometragem Atual"
};

function Vehicles() {
  const { searchValue, typeFilter, setSearchValue, setTypeFilter } =
    useContext<MainContextData>(myContext);

  const [vehicles, setVehicles] = useState<VehiclesData[]>([]);
  const [filterVehicles, setFilterVehicles] = useState<VehiclesData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi(
        "https://api-deslocamento.herokuapp.com/api/v1/Veiculo"
      );
      setVehicles(data);
    };

    fetchData();
    setSearchValue("");
    setTypeFilter("");
  }, []);

  useEffect(() => {
    if (searchValue == "") {
      setFilterVehicles([]);
    }
    if (searchValue !== "") {
      const filterVehicles = vehicles.filter((vehicle) => {
        const value = vehicle[typeFilter as keyof typeof vehicle];
        return value
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      });
      setFilterVehicles(filterVehicles);
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
          Form={ConductorForm}
          headers={Object.values(headers)}
          data={
            filterVehicles.length === 0 && searchValue === ""
              ? vehicles
              : filterVehicles
          }
        />
      </Box>
    </Box>
  );
}
export default Vehicles;
