import { useEffect, useState } from "react";

import { DisplacementsData } from "@/interfaces/types";
import { Box, TextField, Button } from "@mui/material";
import axios from "axios";

function DisplacementForm({ data }: { data: DisplacementsData }) {
  const [formData, setFormData] = useState<DisplacementsData>({
    id: 0,
    kmInicial: 0,
    kmFinal: 0,
    inicioDeslocamento: "",
    fimDeslocamento: "",
    checkList: "",
    motivo: "",
    observacao: "",
    idCondutor: 0,
    idVeiculo: 0,
    idCliente: 0
  });

  const postCliente = async (formData: DisplacementsData) => {
    try {
      const response = await axios.post(
        "https://api-deslocamento.herokuapp.com/api/v1/Condutor",
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
      const {
        id,
        kmInicial,
        kmFinal,
        inicioDeslocamento,
        fimDeslocamento,
        checkList,
        motivo,
        observacao,
        idCondutor,
        idVeiculo,
        idCliente
      } = data;
      setFormData({
        id,
        kmInicial,
        kmFinal,
        inicioDeslocamento,
        fimDeslocamento,
        checkList,
        motivo,
        observacao,
        idCondutor,
        idVeiculo,
        idCliente
      });
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
    postCliente(formData);
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
        label="Fim Deslocamento"
        name="fimDeslocamento"
        size="small"
        value={formData.fimDeslocamento}
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
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Salvar
      </Button>
    </Box>
  );
}
export default DisplacementForm;
