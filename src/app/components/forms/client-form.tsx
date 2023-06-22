import React, { useContext, useEffect, useState } from "react";

import { MainContextData, myContext } from "@/context/MainContext";
import { ClientData } from "@/interfaces/types";
import { brazilStates, fetchApi, postApi, updateApi } from "@/utils/api";
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

const URL_CLIENT = "https://api-deslocamento.herokuapp.com/api/v1/Cliente/";

function ClientForm({ selectId }: { selectId: string }) {
  const { attTables, setAttTables } = useContext<MainContextData>(myContext);
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

  useEffect(() => {
    if (selectId !== "") {
      const fetchData = async () => {
        const data = await fetchApi(`${URL_CLIENT}${selectId}`);
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

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePost = async () => {
    await postApi(URL_CLIENT, formData).then(() => {
      setAttTables(!attTables);
    });
  };

  const handlePut = async () => {
    await updateApi(selectId, URL_CLIENT, formData).then(() => {
      setAttTables(!attTables);
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Número do Documento"
        disabled={selectId !== "" && true}
        name="numeroDocumento"
        size="small"
        value={formData.numeroDocumento}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Tipo do Documento"
        disabled={selectId !== "" && true}
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
          {brazilStates.map((state) => (
            <MenuItem key={state.uf} value={state.uf}>
              {state.nome} ({state.uf})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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

export default ClientForm;
