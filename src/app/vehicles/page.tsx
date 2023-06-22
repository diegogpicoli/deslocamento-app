"use client";

import { useContext, useEffect, useState } from "react";

import VehicleForm from "../components/forms/vehicle-form";
import SearchBar from "../components/search-bar";
import TableInfo from "../components/table-info";

import { MainContextData, myContext } from "@/context/MainContext";
import { VehiclesData } from "@/interfaces/types";
import { deleteApi, fetchApi } from "@/utils/api";
import { Box } from "@mui/material";

const headers = {
  id: "ID",
  placa: "Placa",
  marcaModelo: "Modelo",
  anoFabricacao: "Fabricação",
  kmAtual: "Quilometragem Atual"
};

const URL_VEHICLE = "https://api-deslocamento.herokuapp.com/api/v1/Veiculo/";

function Vehicles() {
  const {
    searchValue,
    typeFilter,
    setSearchValue,
    setTypeFilter,
    attTables,
    setAttTables
  } = useContext<MainContextData>(myContext);

  const [vehicles, setVehicles] = useState<VehiclesData[]>([]);
  const [filterVehicles, setFilterVehicles] = useState<VehiclesData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi(URL_VEHICLE);
      setVehicles(data);
    };

    fetchData();
    setSearchValue("");
    setTypeFilter("");
  }, [attTables]);

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
  }, [searchValue, attTables]);

  const deleteVehicles = async (id: string) => {
    await deleteApi(id, URL_VEHICLE).then(() => {
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
        <TableInfo
          deleteData={deleteVehicles}
          Form={VehicleForm}
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
