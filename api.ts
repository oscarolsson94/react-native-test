import axios from "axios";

const BASE_URL = "https://api.tvmaze.com";

export const fetchTVSeries = async (query: string) => {
  const response = await axios.get(`${BASE_URL}/search/shows?q=${query}`);

  return response.data;
};
