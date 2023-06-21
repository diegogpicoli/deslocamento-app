import { useContext, useEffect, useState } from "react";

import { MainContextData, myContext } from "@/context/MainContext";
import { ConductorData } from "@/interfaces/types";
import { Button, Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import axios from "axios";
import "dayjs/locale/pt-br";

function ConductorForm({ data }: { data: ConductorData }) {
  const [formData, setFormData] = useState<ConductorData>({
    id: 0,
    nome: "",
    numeroHabilitacao: "",
    categoriaHabilitacao: "",
    vencimentoHabilitacao: ""
  });

  const { attTables, setAttTables } = useContext<MainContextData>(myContext);

  const postConductor = async (formData: ConductorData) => {
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
      console.log("Conductor criado com sucesso!");
    } catch (error) {
      console.error(error);
      console.log(formData);
      console.log("Ocorreu um erro ao criar o conductor.");
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
  }, [data]);

  const handleChange = (
    event: React.ChangeEvent<{ name: string; value: unknown }>
  ) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleDateChange = (date: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      vencimentoHabilitacao: date || ""
    }));
  };

  const handleSubmit = () => {
    postConductor(formData).then(() => {
      setAttTables(!attTables);
    });
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
      <LocalizationProvider adapterLocale="pt-br" dateAdapter={AdapterDayjs}>
        <DatePicker
          value={formData.vencimentoHabilitacao}
          onChange={handleDateChange}
          label="Vencimento da Habilitação"
        />
      </LocalizationProvider>
      <Button onClick={handleSubmit} variant="contained" color="primary">
        Salvar
      </Button>
    </Box>
  );
}

export default ConductorForm;
