import { useContext, useEffect, useState } from "react";

import { MainContextData, myContext } from "@/context/MainContext";
import { VehiclesData } from "@/interfaces/types";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";

function VehicleForm({ data }: { data: VehiclesData }) {
  const [formData, setFormData] = useState<VehiclesData>({
    id: 0,
    placa: "",
    marcaModelo: "",
    anoFabricacao: 0,
    kmAtual: 0
  });
  const { attTables, setAttTables } = useContext<MainContextData>(myContext);
  const postVehicle = async (formData: VehiclesData) => {
    try {
      const response = await axios.post(
        "https://api-deslocamento.herokuapp.com/api/v1/Veiculo",
        formData,
        {
          headers: {
            accept: "text/plain",
            "Content-Type": "application/json"
          }
        }
      );

      console.log(response.data);

      console.log("Cliente criado com sucesso!");
    } catch (error) {
      console.error(error);

      console.log("Ocorreu um erro ao criar o cliente.");
    }
  };

  useEffect(() => {
    if (data) {
      const { id, placa, marcaModelo, anoFabricacao, kmAtual } = data;
      setFormData({ id, placa, marcaModelo, anoFabricacao, kmAtual });
    }
  }, []);

  const handleChange = (
    event: React.ChangeEvent<{ name: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    postVehicle(formData).then(() => {
      setAttTables(!attTables);
    });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Placa"
        name="placa"
        size="small"
        value={formData.placa}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Marca/Modelo"
        name="marcaModelo"
        size="small"
        value={formData.marcaModelo}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Ano de Fabricação"
        name="anoFabricacao"
        size="small"
        value={formData.anoFabricacao}
        onChange={handleChange}
        fullWidth
        required
        type="number"
      />
      <TextField
        label="Km Atual"
        name="kmAtual"
        size="small"
        value={formData.kmAtual}
        onChange={handleChange}
        fullWidth
        required
        type="number"
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Enviar
      </Button>
    </Box>
  );
}
export default VehicleForm;
