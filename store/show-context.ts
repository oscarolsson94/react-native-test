import { createContext, useContext } from "react";
import { ShowInfo } from "../utils/types";

export type ShowContext = {
  favoriteShows: ShowInfo[];
  setFavoriteShows: (shows: ShowInfo[]) => void;
};

export const FavoriteShowsContext = createContext<ShowContext>({
  favoriteShows: [],
  setFavoriteShows: () => {},
});
export const useGlobalContext = () => useContext(FavoriteShowsContext);
