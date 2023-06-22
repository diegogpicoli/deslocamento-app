import { useContext, useEffect, useState } from "react";

import { MainContextData, myContext } from "@/context/MainContext";
import { VehiclesData } from "@/interfaces/types";
import { fetchApi, postApi, updateApi } from "@/utils/api";
import { Box, TextField, Button } from "@mui/material";

const URL_VEHICLE = "https://api-deslocamento.herokuapp.com/api/v1/Veiculo/";

function VehicleForm({ selectId }: { selectId: string }) {
  const [formData, setFormData] = useState<VehiclesData>({
    id: 0,
    placa: "",
    marcaModelo: "",
    anoFabricacao: 0,
    kmAtual: 0
  });
  const { attTables, setAttTables } = useContext<MainContextData>(myContext);

  useEffect(() => {
    if (selectId !== "") {
      const fetchData = async () => {
        const data = await fetchApi(`${URL_VEHICLE}${selectId}`);
        if (data) setFormData(data);
      };
      fetchData();
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

  const handlePost = async () => {
    await postApi(URL_VEHICLE, formData).then(() => {
      setAttTables(!attTables);
    });
  };

  const handlePut = async () => {
    await updateApi(selectId, URL_VEHICLE, formData).then(() => {
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
        disabled={selectId !== "" && true}
        size="small"
        value={formData.marcaModelo}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Ano de Fabricação"
        name="anoFabricacao"
        disabled={selectId !== "" && true}
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
      <Button
        onClick={selectId !== "" ? handlePut : handlePost}
        variant="contained"
        color="primary"
      >
        {selectId !== "" ? "Atualizar" : "Salvar"}
      </Button>
    </Box>
  );
}
export default VehicleForm;
