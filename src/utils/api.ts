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

const handleFetchData = async () => {
  try {
    const data = await fetchApi("https://api.example.com/data");
    console.log(data);
  } catch (error) {
    console.error("error");
  }
};

export default fetchApi;
