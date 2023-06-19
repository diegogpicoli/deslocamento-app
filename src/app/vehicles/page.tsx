"use client";

import { useEffect, useState } from "react";

import SearchBar from "../components/search-bar";
import TableInfo from "../components/table-info";

import { VehiclesData } from "@/interfaces/types";
import fetchApi from "@/utils/api";
import { Box } from "@mui/material";

const headers = ["ID", "Placa", "Modelo", "Fabricação", "Quilometragem Atual"];

function Vehicles() {
  const [vehicles, setVehicles] = useState<VehiclesData[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchApi(
        "https://api-deslocamento.herokuapp.com/api/v1/Veiculo"
      );
      setVehicles(data);
    };

    fetchData();
  }, []);

  return (
    <Box>
      <SearchBar filtros={headers} />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <TableInfo headers={headers} data={vehicles} />
      </Box>
    </Box>
  );
}
export default Vehicles;
