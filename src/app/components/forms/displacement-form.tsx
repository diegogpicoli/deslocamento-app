"use client";

import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { MainContextData, myContext } from "@/context/MainContext";
import { DisplacementsData } from "@/interfaces/types";
import {
  fetchApi,
  fetchDateTimeApi,
  finishDisplacement,
  postApi
} from "@/utils/api";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  TextField,
  Button,
  Select,
  SelectChangeEvent
} from "@mui/material";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import * as yup from "yup";

const URL_DISPLACEMENTS_INICIAR =
  "https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento/";

const URL_DISPLACEMENTS =
  "https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/";

const schemaPost = yup.object().shape({
  kmInicial: yup.number().required("A quilometragem inicial é obrigatória."),
  kmFinal: yup
    .number()
    .required("A quilometragem final é obrigatória.")
    .default(null),
  checkList: yup.string().required("O checklist é obrigatório."),
  motivo: yup.string().required("O motivo é obrigatório."),
  observacao: yup
    .string()
    .required("A observação é obrigatória.")
    .default(null),
  idCondutor: yup
    .number()
    .positive()
    .required("O ID do condutor é obrigatório."),
  idVeiculo: yup.number().positive().required("O ID do veículo é obrigatório."),
  idCliente: yup.number().positive().required("O ID do cliente é obrigatório.")
});

const schemaPut = yup.object().shape({
  kmInicial: yup.number(),
  kmFinal: yup
    .number()
    .positive()
    .required("A quilometragem final é obrigatória."),
  checkList: yup.string(),
  motivo: yup.string(),
  observacao: yup.string().required("A observação é obrigatória."),
  idCondutor: yup.number(),
  idVeiculo: yup.number(),
  idCliente: yup.number()
});

function DisplacementForm({
  selectId,
  handleClose
}: {
  selectId: string;
  handleClose: () => void;
}) {
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

  const {
    register,
    handleSubmit: onSubmit,
    setValue
  } = useForm({
    resolver: yupResolver(selectId !== "" ? schemaPut : schemaPost)
  });

  const { attTables, setAttTables, clients, conductors, vehicles } =
    useContext<MainContextData>(myContext);

  useEffect(() => {
    if (selectId !== "") {
      const fetchData = async () => {
        const data = await fetchApi(`${URL_DISPLACEMENTS}${selectId}`);
        if (data) setFormData(data);
        setValue("observacao", data.observacao, {
          shouldValidate: true
        });
      };
      fetchData();
    }
  }, []);

  const handleChange = (
    event: React.ChangeEvent<{ name: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    console.log(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handlePost = async () => {
    console.log("aqui");
    console.log(formData);
    fetchDateTimeApi().then(async (dateTime) => {
      await postApi(URL_DISPLACEMENTS_INICIAR, {
        ...formData,
        inicioDeslocamento: dateTime
      }).then(() => {
        setAttTables(!attTables);
      });
    });
  };

  const handlePut = async () => {
    fetchDateTimeApi().then(async (dateTime) => {
      await finishDisplacement(selectId, {
        ...formData,
        kmFinal: Number(formData.kmFinal),
        fimDeslocamento: dateTime
      }).then(() => {
        setAttTables(!attTables);
      });
    });
  };

  const handleChangeSelect = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleFormSubmit = async () => {
    if (selectId !== "") {
      await handlePut();
      handleClose();
    } else {
      await handlePost();
      handleClose();
    }
  };

  return (
    <form onSubmit={onSubmit(handleFormSubmit)}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Km Inicial"
          {...register("kmInicial")}
          size="small"
          value={formData.kmInicial}
          onChange={handleChange}
          style={selectId !== "" ? { display: "none" } : {}}
          fullWidth
          required
          type="number"
        />
        <TextField
          label="Km Final"
          {...register("kmFinal")}
          size="small"
          value={formData.kmFinal}
          onChange={handleChange}
          style={selectId !== "" ? {} : { display: "none" }}
          fullWidth
          required
          type="number"
        />
        <TextField
          label="Checklist"
          {...register("checkList")}
          size="small"
          value={formData.checkList}
          onChange={handleChange}
          style={selectId !== "" ? { display: "none" } : {}}
          fullWidth
          required
        />
        <TextField
          label="Motivo"
          {...register("motivo")}
          size="small"
          value={formData.motivo}
          onChange={handleChange}
          style={selectId !== "" ? { display: "none" } : {}}
          fullWidth
          required
        />
        <TextField
          label="Observação"
          {...register("observacao")}
          size="small"
          value={formData.observacao}
          onChange={handleChange}
          fullWidth
          required
        />
        <FormControl
          size="small"
          style={selectId !== "" ? { display: "none" } : {}}
        >
          <InputLabel>Condutor</InputLabel>
          <Select
            label="Condutor"
            {...register("idCondutor")}
            value={String(formData.idCondutor)}
            onChange={handleChangeSelect}
          >
            {conductors.map((conductor) => (
              <MenuItem key={conductor.id} value={conductor.id}>
                {conductor.nome}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          size="small"
          style={selectId !== "" ? { display: "none" } : {}}
        >
          <InputLabel>Veiculo</InputLabel>
          <Select
            label="Veiculo"
            {...register("idVeiculo")}
            value={String(formData.idVeiculo)}
            onChange={handleChangeSelect}
          >
            {vehicles.map((vehicle) => (
              <MenuItem key={vehicle.id} value={vehicle.id}>
                {vehicle.marcaModelo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl
          size="small"
          style={selectId !== "" ? { display: "none" } : {}}
        >
          <InputLabel>Cliente</InputLabel>
          <Select
            label="Cliente"
            {...register("idCliente")}
            value={String(formData.idCliente)}
            onChange={handleChangeSelect}
          >
            {clients.map((client) => (
              <MenuItem key={client.id} value={client.id}>
                {client.nome}
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

export default DisplacementForm;
