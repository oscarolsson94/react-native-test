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

/* const showsReducer = (state: ShowInfo[], action) => {
  switch (action.type) {
    case "ADD":
      return [...state, { ...action.payload }];
    case "DELETE":
      return state.filter((show) => show.name !== action.payload);
    default:
      return state;
  }
}; */
