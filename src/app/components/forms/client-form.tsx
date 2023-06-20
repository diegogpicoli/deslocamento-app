import React, { useEffect, useState } from "react";

import { ClientData } from "@/interfaces/types";
import { brazilianStates } from "@/utils/api";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField
} from "@mui/material";
import axios from "axios";

function ClientForm({ data }: { data: ClientData }) {
  const [formData, setFormData] = useState<ClientData>({
    id: 0,
    numeroDocumento: "",
    tipoDocumento: "",
    nome: "",
    logradouro: "",
    numero: "",
    bairro: "",
    cidade: "",
    uf: ""
  });

  const postCliente = async (formData: ClientData) => {
    try {
      const response = await axios.post(
        "https://api-deslocamento.herokuapp.com/api/v1/Cliente",
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
        numeroDocumento,
        tipoDocumento,
        nome,
        logradouro,
        numero,
        bairro,
        cidade,
        uf
      } = data;
      setFormData({
        id,
        numeroDocumento,
        tipoDocumento,
        nome,
        logradouro,
        numero,
        bairro,
        cidade,
        uf
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

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
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
        label="Número do Documento"
        name="numeroDocumento"
        size="small"
        value={formData.numeroDocumento}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Tipo do Documento"
        name="tipoDocumento"
        size="small"
        value={formData.tipoDocumento}
        onChange={handleChange}
        fullWidth
        required
      />
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
        label="Logradouro"
        name="logradouro"
        size="small"
        value={formData.logradouro}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Número"
        name="numero"
        size="small"
        value={formData.numero}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Bairro"
        name="bairro"
        size="small"
        value={formData.bairro}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Cidade"
        name="cidade"
        size="small"
        value={formData.cidade}
        onChange={handleChange}
        fullWidth
        required
      />
      <FormControl fullWidth required>
        <InputLabel>UF</InputLabel>
        <Select
          size="small"
          name="uf"
          value={formData.uf}
          onChange={handleChangeSelect}
        >
          {brazilianStates.map((state) => (
            <MenuItem key={state.uf} value={state.uf}>
              {state.nome} ({state.uf})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Salvar
      </Button>
    </Box>
  );
}

export default ClientForm;
