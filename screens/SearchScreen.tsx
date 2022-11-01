import { useEffect, useState } from "react";
import { Text, View, TextInput, FlatList } from "react-native";
import { fetchTVSeries } from "../api";
import { ListItem } from "../components/ListItem";
import useDebounce from "../hooks/useDebounce";
import translations from "../translations.json";
import { Show } from "../utils/types";

const DEBOUNCE_DELAY = 500;

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [shows, setShows] = useState<Show[]>([]);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [apiError, setApiError] = useState(false);

  const debouncedQuery = useDebounce<string>(searchQuery, DEBOUNCE_DELAY);

  const handleTextChange = (enteredText: string) => {
    setSearchQuery(enteredText);
  };

  useEffect(() => {
    setApiError(false);
    setFetchLoading(true);
    try {
      (async () => {
        const fetchedShows = await fetchTVSeries(searchQuery);
        setShows(fetchedShows);
      })();
    } catch {
      setApiError(true);
    } finally {
      setFetchLoading(false);
    }
  }, [debouncedQuery]);

  return (
    <View>
      <TextInput
        placeholder={translations.searchBar.placeholder}
        onChangeText={handleTextChange}
        /* fetchLoading && showSpinner */
      />
      {apiError ? (
        <Text>{translations.errors.apiError}</Text>
      ) : shows.length > 0 && searchQuery ? (
        <FlatList
          data={shows}
          renderItem={({ item }) => (
            <ListItem
              name={item.show.name}
              rating={item.score}
              imageUri={item.show.image?.medium}
              genres={
                item.show.genres.length > 0
                  ? item.show.genres
                  : ["Unknown genre"]
              }
            />
          )}
          keyExtractor={({ show }) => show.id.toString()}
        />
      ) : searchQuery && !fetchLoading ? (
        <Text>{translations.searchBar.noMatchingSearches}</Text>
      ) : null}
    </View>
  );
};
