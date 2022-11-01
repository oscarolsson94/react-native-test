import axios from "axios";
import { Show } from "./utils/types";

const BASE_URL = "https://api.tvmaze.com";

export const fetchTVSeries = async (query: string): Promise<Show[]> => {
  const response = await axios.get(`${BASE_URL}/search/shows?q=${query}`);

  return response.data;
};
