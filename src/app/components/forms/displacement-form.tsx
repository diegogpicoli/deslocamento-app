"use client";

import { useContext, useEffect, useState } from "react";

import { MainContextData, myContext } from "@/context/MainContext";
import { DisplacementsData } from "@/interfaces/types";
import {
  fetchApi,
  fetchDateTimeApi,
  finishDisplacement,
  postApi,
  updateApi
} from "@/utils/api";
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

const URL_DISPLACEMENTS_INICIAR =
  "https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/IniciarDeslocamento/";

const URL_DISPLACEMENTS =
  "https://api-deslocamento.herokuapp.com/api/v1/Deslocamento/";

function DisplacementForm({ selectId }: { selectId: string }) {
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

  const { attTables, setAttTables, clients, conductors, vehicles } =
    useContext<MainContextData>(myContext);

  useEffect(() => {
    if (selectId !== "") {
      const fetchData = async () => {
        const data = await fetchApi(`${URL_DISPLACEMENTS}${selectId}`);
        if (data) setFormData(data);
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Km Inicial"
        name="kmInicial"
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
        name="kmFinal"
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
        name="checkList"
        size="small"
        value={formData.checkList}
        onChange={handleChange}
        style={selectId !== "" ? { display: "none" } : {}}
        fullWidth
        required
      />
      <TextField
        label="Motivo"
        name="motivo"
        size="small"
        value={formData.motivo}
        onChange={handleChange}
        style={selectId !== "" ? { display: "none" } : {}}
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
      <FormControl
        size="small"
        style={selectId !== "" ? { display: "none" } : {}}
      >
        <InputLabel>Condutor</InputLabel>
        <Select
          label="Condutor"
          name="idCondutor"
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
          name="idVeiculo"
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
          name="idCliente"
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
export default DisplacementForm;
