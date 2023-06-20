import axios from "axios";

const fetchApi = async (url: string) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Ocorreu um erro ao buscar os dados da API.");
  }
};

export default fetchApi;
