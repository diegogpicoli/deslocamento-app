import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { MainContextData, myContext } from "@/context/MainContext";
import { VehiclesData } from "@/interfaces/types";
import { fetchApi, postApi, updateApi } from "@/utils/api";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, TextField, Button } from "@mui/material";
import * as yup from "yup";

const URL_VEHICLE = "https://api-deslocamento.herokuapp.com/api/v1/Veiculo/";

const schemaPost = yup.object().shape({
  placa: yup.string(),
  marcaModelo: yup.string(),
  anoFabricacao: yup.number(),
  kmAtual: yup.number()
});

const schemaPut = yup.object().shape({
  placa: yup.string(),
  marcaModelo: yup.string(),
  anoFabricacao: yup.number(),
  kmAtual: yup.number()
});

function VehicleForm({
  selectId,
  handleClose
}: {
  selectId: string;
  handleClose: () => void;
}) {
  const [formData, setFormData] = useState<VehiclesData>({
    id: 0,
    placa: "",
    marcaModelo: "",
    anoFabricacao: 0,
    kmAtual: 0
  });

  const {
    register,
    handleSubmit: onSubmit,
    setValue
  } = useForm({
    resolver: yupResolver(selectId !== "" ? schemaPut : schemaPost)
  });

  const { attTables, setAttTables } = useContext<MainContextData>(myContext);

  useEffect(() => {
    if (selectId !== "") {
      const fetchData = async () => {
        const data = await fetchApi(`${URL_VEHICLE}${selectId}`);
        if (data) {
          setFormData(data);
          setValue("placa", data.placa, { shouldValidate: true });
          setValue("kmAtual", data.kmAtual, { shouldValidate: true });
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

  const handlePost = async () => {
    await postApi(URL_VEHICLE, formData).then(() => {
      setAttTables(!attTables);
    });
  };

  const handlePut = async () => {
    await updateApi(selectId, URL_VEHICLE, formData).then(() => {
      setAttTables(!attTables);
    });
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
          label="Placa"
          {...register("placa")}
          size="small"
          value={formData.placa}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Marca/Modelo"
          name="marcaModelo"
          disabled={selectId !== "" && true}
          size="small"
          value={formData.marcaModelo}
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          label="Ano de Fabricação"
          {...register("anoFabricacao")}
          disabled={selectId !== "" && true}
          size="small"
          value={formData.anoFabricacao}
          onChange={handleChange}
          fullWidth
          required
          type="number"
        />
        <TextField
          label="Km Atual"
          {...register("kmAtual")}
          size="small"
          value={formData.kmAtual}
          onChange={handleChange}
          fullWidth
          required
          type="number"
        />
        <Button variant="contained" color="primary" type="submit">
          {selectId !== "" ? "Atualizar" : "Salvar"}
        </Button>
      </Box>
    </form>
  );
}
export default VehicleForm;
