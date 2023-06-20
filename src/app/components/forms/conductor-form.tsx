import { useEffect, useState } from "react";

import { ConductorData } from "@/interfaces/types";
import { Button, Box, TextField } from "@mui/material";
import axios from "axios";

function ConductorForm({ data }: { data: ConductorData }) {
  const [formData, setFormData] = useState<ConductorData>({
    id: 0,
    nome: "",
    numeroHabilitacao: "",
    categoriaHabilitacao: "",
    vencimentoHabilitacao: ""
  });

  const postCliente = async (formData: ConductorData) => {
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
      console.log(formData);
      console.log("Ocorreu um erro ao criar o cliente.");
    }
  };

  useEffect(() => {
    if (data) {
      const {
        id,
        nome,
        numeroHabilitacao,
        categoriaHabilitacao,
        vencimentoHabilitacao
      } = data;
      setFormData({
        id,
        nome,
        numeroHabilitacao,
        categoriaHabilitacao,
        vencimentoHabilitacao
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
        label="Nome"
        name="nome"
        size="small"
        value={formData.nome}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Número Habilitação"
        name="numeroHabilitacao"
        size="small"
        value={formData.numeroHabilitacao}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Categoria Habilitação"
        name="categoriaHabilitacao"
        size="small"
        value={formData.categoriaHabilitacao}
        onChange={handleChange}
        fullWidth
        required
      />
      <DatePicker
        label="Vencimento Habilitação"
        name="vencimentoHabilitacao"
        value={formData.vencimentoHabilitacao}
        onChange={handleDateChange}
        renderInput={(params) => (
          <TextField {...params} size="small" fullWidth required />
        )}
      />
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Salvar
      </Button>
    </Box>
  );
}
export default ConductorForm;
