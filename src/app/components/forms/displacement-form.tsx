import { useContext, useState } from "react";

import { MainContextData, myContext } from "@/context/MainContext";
import { DisplacementsData } from "@/interfaces/types";
import { postApi } from "@/utils/api";
import { Box, TextField, Button } from "@mui/material";

const URL_DISPLACEMENTS =
  "https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/";

function DisplacementForm() {
  const [formData, setFormData] = useState<DisplacementsData>({
    id: 0,
    kmInicial: 0,
    kmFinal: 0,
    inicioDeslocamento: "",
    checkList: "",
    motivo: "",
    observacao: "",
    idCondutor: 0,
    idVeiculo: 0,
    idCliente: 0
  });

  const { attTables, setAttTables } = useContext<MainContextData>(myContext);

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
    await postApi(URL_DISPLACEMENTS, formData).then(() => {
      setAttTables(!attTables);
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Km Inicial"
        name="kmInicial"
        size="small"
        value={formData.kmInicial}
        onChange={handleChange}
        fullWidth
        required
        type="number"
      />
      <TextField
        label="Km Final"
        name="kmFinal"
        size="small"
        value={formData.kmFinal}
        onChange={handleChange}
        fullWidth
        required
        type="number"
      />
      <TextField
        label="Início Deslocamento"
        name="inicioDeslocamento"
        size="small"
        value={formData.inicioDeslocamento}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Checklist"
        name="checkList"
        size="small"
        value={formData.checkList}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Motivo"
        name="motivo"
        size="small"
        value={formData.motivo}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Observação"
        name="observacao"
        size="small"
        value={formData.observacao}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="ID Condutor"
        name="idCondutor"
        size="small"
        value={formData.idCondutor}
        onChange={handleChange}
        fullWidth
        required
        type="number"
      />
      <TextField
        label="ID Veículo"
        name="idVeiculo"
        size="small"
        value={formData.idVeiculo}
        onChange={handleChange}
        fullWidth
        required
        type="number"
      />
      <TextField
        label="ID Cliente"
        name="idCliente"
        size="small"
        value={formData.idCliente}
        onChange={handleChange}
        fullWidth
        required
        type="number"
      />
      <Button onClick={handlePost} variant="contained" color="primary">
        Salvar
      </Button>
    </Box>
  );
}
export default DisplacementForm;
