"use client";

import { useEffect, useState } from "react";

import TableInfo from "../components/table-info";

import { VehiclesData } from "@/interfaces/types";
import fetchApi from "@/utils/api";
import { Box } from "@mui/material";

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center"
      }}
    >
      <TableInfo
        headers={["ID", "Placa", "Modelo", "Fabricação", "Quilometragem Atual"]}
        data={vehicles}
      />
    </Box>
  );
}
export default Vehicles;
