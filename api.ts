import axios from "axios";
import { Show } from "./utils/types";

const BASE_URL = "https://api.tvmaze.com";

export const fetchTVSeries = async (
  query: string
): Promise<Show[] | string> => {
  try {
    const { data } = await axios.get<Show[]>(
      `${BASE_URL}/search/shows?q=${query}`
    );
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return error.message;
    } else {
      return "An unexpected error occurred";
    }
  }
};
