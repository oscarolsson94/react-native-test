import { useEffect, useLayoutEffect, useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import { fetchTVSeries } from "../api";
import { SearchBar } from "../components/SearchBar";
import useDebounce from "../hooks/useDebounce";
import translations from "../translations.json";
import { Show } from "../utils/types";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalContext } from "../store/show-context";
import { useNavigation } from "@react-navigation/native";
import { IconButton } from "../components/IconButton";
import { ShowsList } from "../components/ShowsList";

const DEBOUNCE_DELAY = 500;

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [shows, setShows] = useState<Show[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  const { favoriteShows } = useGlobalContext();
  const navigation = useNavigation();
  const debouncedQuery = useDebounce<string>(searchQuery, DEBOUNCE_DELAY);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchTVSeries(searchQuery);

      if (typeof data === "object") {
        setShows(data);
      } else {
        setApiError(true);
      }
      setFetchLoading(false);
    };

    setApiError(false);

    if (searchQuery.length > 0) {
      fetchData();
    }

    setFetchLoading(false);
  }, [debouncedQuery]);

  useLayoutEffect(() => {
    if (favoriteShows.length > 0) {
      navigation.setOptions({
        headerRight: () => (
          <IconButton
            onPress={() => {
              navigation.navigate("FavoritesScreen");
            }}
          >
            <Ionicons name="save-outline" color="white" size={20} />
          </IconButton>
        ),
      });
    }
  }, [favoriteShows]);

  const handleTextChange = (enteredText: string) => {
    setFetchLoading(true);
    setSearchQuery(enteredText);
  };

  return (
    <View style={styles.container}>
      <SearchBar onTextChange={handleTextChange} isLoading={fetchLoading} />
      {apiError ? (
        <Text>{translations.errors.apiError}</Text>
      ) : shows.length > 0 && searchQuery ? (
        <ShowsList shows={shows} />
      ) : searchQuery && !fetchLoading ? (
        <Text>{translations.searchBar.noMatchingSearches}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
