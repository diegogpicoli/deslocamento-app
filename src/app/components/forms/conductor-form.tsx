import { useContext, useEffect, useState } from "react";

import { MainContextData, myContext } from "@/context/MainContext";
import { ConductorData } from "@/interfaces/types";
import { fetchApi, postApi, updateApi } from "@/utils/api";
import { Button, Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import "dayjs/locale/pt-br";

const URL_CONDUCTORS =
  "https://api-deslocamento.herokuapp.com/api/v1/Condutor/";

function ConductorForm({ selectId }: { selectId: string }) {
  const [formData, setFormData] = useState<ConductorData>({
    id: 0,
    nome: "",
    numeroHabilitacao: "",
    categoriaHabilitacao: "",
    vencimentoHabilitacao: ""
  });
  const [dateVencimento, setDateVencimento] = useState("");

  const { attTables, setAttTables } = useContext<MainContextData>(myContext);

  useEffect(() => {
    if (selectId !== "") {
      const fetchData = async () => {
        const data = await fetchApi(`${URL_CONDUCTORS}${selectId}`);
        if (data) console.log(data.catergoriaHabilitacao);
        setDateVencimento(data.vencimentoHabilitacao);
        setFormData({
          ...data,
          categoriaHabilitacao: data.catergoriaHabilitacao,
          vencimentoHabilitacao: ""
        });
        console.log(formData);
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

  const handleDateChange = (date: string | null) => {
    setFormData((prevData) => ({
      ...prevData,
      vencimentoHabilitacao: date || ""
    }));
  };

  const handlePost = async () => {
    await postApi(URL_CONDUCTORS, formData).then(() => {
      setAttTables(!attTables);
    });
  };

  const handlePut = async () => {
    delete formData.catergoriaHabilitacao;
    await updateApi(selectId, URL_CONDUCTORS, {
      ...formData,
      vencimentoHabilitacao: dateVencimento
    }).then(() => {
      setAttTables(!attTables);
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <TextField
        label="Nome"
        name="nome"
        disabled={selectId !== "" && true}
        size="small"
        value={formData.nome}
        onChange={handleChange}
        fullWidth
        required
      />
      <TextField
        label="Número Habilitação"
        name="numeroHabilitacao"
        disabled={selectId !== "" && true}
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

export default ConductorForm;
