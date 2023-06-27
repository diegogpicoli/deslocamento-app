import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { MainContextData, myContext } from "@/context/MainContext";
import { ClientData } from "@/interfaces/types";
import { brazilStates, fetchApi, postApi, updateApi } from "@/utils/api";
import { yupResolver } from "@hookform/resolvers/yup";
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
import * as yup from "yup";

const schemaPost = yup.object().shape({
  numeroDocumento: yup.string().required("Número do Documento é obrigatório"),
  tipoDocumento: yup.string().required("Tipo do Documento é obrigatório"),
  nome: yup.string().required("Nome é obrigatório"),
  logradouro: yup.string().required("Logradouro é obrigatório"),
  numero: yup.string().required("Número é obrigatório"),
  bairro: yup.string().required("Bairro é obrigatório"),
  cidade: yup.string().required("Cidade é obrigatório"),
  uf: yup.string().required("UF é obrigatório")
});

const schemaPut = yup.object().shape({
  numeroDocumento: yup.string(),
  tipoDocumento: yup.string(),
  nome: yup.string().required("Nome é obrigatório"),
  logradouro: yup.string().required("Logradouro é obrigatório"),
  numero: yup.string().required("Número é obrigatório"),
  bairro: yup.string().required("Bairro é obrigatório"),
  cidade: yup.string().required("Cidade é obrigatório"),
  uf: yup.string().required("UF é obrigatório")
});

const URL_CLIENT = "https://api-deslocamento.herokuapp.com/api/v1/Cliente/";

function ClientForm({
  selectId,
  handleClose
}: {
  selectId: string;
  handleClose: () => void;
}) {
  const { attTables, setAttTables } = useContext<MainContextData>(myContext);
  const {
    register,
    handleSubmit: onSubmit,
    setValue
  } = useForm({
    resolver: yupResolver(selectId !== "" ? schemaPut : schemaPost)
  });

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
        if (data) {
          setFormData(data);
          setValue("nome", data.nome, { shouldValidate: true });
          setValue("logradouro", data.logradouro, { shouldValidate: true });
          setValue("numero", data.numero, { shouldValidate: true });
          setValue("bairro", data.bairro, { shouldValidate: true });
          setValue("cidade", data.cidade, { shouldValidate: true });
          setValue("uf", data.uf, { shouldValidate: true });
        }
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

  const handleSubmit = async () => {
    if (selectId !== "") {
      await handlePut();
      handleClose();
    } else {
      await handlePost();
      handleClose();
    }
  };

  return (
    <form onSubmit={onSubmit(handleSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Número do Documento"
          disabled={selectId !== "" && true}
          {...register("numeroDocumento")}
          size="small"
          value={formData.numeroDocumento}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Tipo do Documento"
          disabled={selectId !== "" && true}
          {...register("tipoDocumento")}
          size="small"
          value={formData.tipoDocumento}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Nome"
          {...register("nome")}
          size="small"
          value={formData.nome}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Logradouro"
          {...register("logradouro")}
          size="small"
          value={formData.logradouro}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Número"
          {...register("numero")}
          size="small"
          value={formData.numero}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Bairro"
          {...register("bairro")}
          size="small"
          value={formData.bairro}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Cidade"
          {...register("cidade")}
          size="small"
          value={formData.cidade}
          onChange={handleChange}
          fullWidth
          required
        />
        <FormControl size="small" fullWidth required>
          <InputLabel>UF</InputLabel>
          <Select
            label="UF"
            {...register("uf")}
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
        <Button variant="contained" color="primary" type="submit">
          {selectId !== "" ? "Atualizar" : "Salvar"}
        </Button>
      </Box>
    </form>
  );
}

export default ClientForm;
