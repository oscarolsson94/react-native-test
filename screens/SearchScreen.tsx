import { useEffect, useState } from "react";
import { Text, View, TextInput, FlatList } from "react-native";
import { fetchTVSeries } from "../api";
import { ListItem } from "../components/ListItem";
import { SearchBar } from "../components/SearchBar";
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

  useEffect(() => {
    setApiError(false);
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

  const handleTextChange = (enteredText: string) => {
    setFetchLoading(true);
    setSearchQuery(enteredText);
  };

  return (
    <View>
      <SearchBar onTextChange={handleTextChange} isLoading={fetchLoading} />
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
              summary={item.show.summary}
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
