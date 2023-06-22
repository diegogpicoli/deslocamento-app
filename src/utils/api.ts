import {
  ClientData,
  ConductorData,
  DisplacementsData,
  VehiclesData
} from "@/interfaces/types";
import axios from "axios";

export const fetchApi = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Ocorreu um erro ao buscar os dados da API.");
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const postApi = async (
  url: string,
  formData: ClientData | ConductorData | VehiclesData | DisplacementsData
) => {
  try {
    const response = await axios.post(url, formData, {
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json"
      }
    });
    return console.log(response.data.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);
    return console.log("Ocorreu um erro ao criar o cliente.");
  }
};

export const updateApi = async (
  id: string,
  url: string,
  formData: ClientData | ConductorData | VehiclesData | DisplacementsData
) => {
  console.log(id);
  console.log(url);
  console.log(formData);
  try {
    const response = await axios.put(`${url}${id}`, formData, {
      headers: {
        accept: "text/plain",
        "Content-Type": "application/json"
      }
    });
    return console.log(response.data.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);

    console.log("Ocorreu um erro ao tentar atualizar o cliente.");
  }
};

export const deleteApi = async (id: string, url: string) => {
  try {
    const response = await axios.delete(`${url}${id}`, { data: { id } });

    return console.log(response.data.message);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error.message);

    console.log("Ocorreu um erro ao tentar atualizar o cliente.");
  }
};

export const brazilStates = [
  { uf: "AC", nome: "Acre" },
  { uf: "AL", nome: "Alagoas" },
  { uf: "AP", nome: "Amapá" },
  { uf: "AM", nome: "Amazonas" },
  { uf: "BA", nome: "Bahia" },
  { uf: "CE", nome: "Ceará" },
  { uf: "DF", nome: "Distrito Federal" },
  { uf: "ES", nome: "Espírito Santo" },
  { uf: "GO", nome: "Goiás" },
  { uf: "MA", nome: "Maranhão" },
  { uf: "MT", nome: "Mato Grosso" },
  { uf: "MS", nome: "Mato Grosso do Sul" },
  { uf: "MG", nome: "Minas Gerais" },
  { uf: "PA", nome: "Pará" },
  { uf: "PB", nome: "Paraíba" },
  { uf: "PR", nome: "Paraná" },
  { uf: "PE", nome: "Pernambuco" },
  { uf: "PI", nome: "Piauí" },
  { uf: "RJ", nome: "Rio de Janeiro" },
  { uf: "RN", nome: "Rio Grande do Norte" },
  { uf: "RS", nome: "Rio Grande do Sul" },
  { uf: "RO", nome: "Rondônia" },
  { uf: "RR", nome: "Roraima" },
  { uf: "SC", nome: "Santa Catarina" },
  { uf: "SP", nome: "São Paulo" },
  { uf: "SE", nome: "Sergipe" },
  { uf: "TO", nome: "Tocantins" }
];
