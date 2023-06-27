import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { MainContextData, myContext } from "@/context/MainContext";
import { ConductorData } from "@/interfaces/types";
import { fetchApi, postApi, updateApi } from "@/utils/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Box, TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import * as yup from "yup";
import "dayjs/locale/pt-br";

const URL_CONDUCTORS =
  "https://api-deslocamento.herokuapp.com/api/v1/Condutor/";

const schemaPost = yup.object().shape({
  nome: yup.string().required('"Nome" é obrigatório.'),
  numeroHabilitacao: yup.string().required('"Número" é obrigatório.'),
  categoriaHabilitacao: yup.string().required('"Categoria" é obrigatório.')
});

const schemaPut = yup.object().shape({
  nome: yup.string(),
  numeroHabilitacao: yup.string(),
  categoriaHabilitacao: yup.string().required('"Categoria" é obrigatório.')
});

function ConductorForm({
  selectId,
  handleClose
}: {
  selectId: string;
  handleClose: () => void;
}) {
  const [formData, setFormData] = useState<ConductorData>({
    id: 0,
    nome: "",
    numeroHabilitacao: "",
    categoriaHabilitacao: "",
    vencimentoHabilitacao: ""
  });
  const {
    register,
    handleSubmit: onSubmit,
    setValue
  } = useForm({
    resolver: yupResolver(selectId !== "" ? schemaPut : schemaPost)
  });

  const { attTables, setAttTables } = useContext<MainContextData>(myContext);
  const [oldDate, setOldDate] = useState<Date | null>(null);

  useEffect(() => {
    if (selectId !== "") {
      const fetchData = async () => {
        const data = await fetchApi(`${URL_CONDUCTORS}${selectId}`);
        if (data) {
          setFormData({
            ...data,
            categoriaHabilitacao: data.catergoriaHabilitacao,
            vencimentoHabilitacao: ""
          });
          setOldDate(data.vencimentoHabilitacao);
          setValue("categoriaHabilitacao", data.categoriaHabilitacao, {
            shouldValidate: true
          });
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
      ...formData
    }).then(() => {
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
          label="Nome"
          {...register("nome")}
          disabled={selectId !== "" && true}
          size="small"
          value={formData.nome}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Número Habilitação"
          {...register("numeroHabilitacao")}
          disabled={selectId !== "" && true}
          size="small"
          value={formData.numeroHabilitacao}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Categoria Habilitação"
          {...register("categoriaHabilitacao")}
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
        <Button variant="contained" color="primary" type="submit">
          {selectId !== "" ? "Atualizar" : "Salvar"}
        </Button>
      </Box>
    </form>
  );
}

export default ConductorForm;
