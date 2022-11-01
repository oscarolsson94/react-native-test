import { useEffect, useState } from "react";
import { Text, View, TextInput, FlatList } from "react-native";
import { fetchTVSeries } from "../api";
import useDebounce from "../hooks/useDebounce";
import translations from "../translations.json";
import { Show } from "../utils/types";

const DEBOUNCE_DELAY = 500;

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [shows, setShows] = useState<Show[]>([]);

  const debouncedQuery = useDebounce<string>(searchQuery, DEBOUNCE_DELAY);

  const handleTextChange = (enteredText: string) => {
    setSearchQuery(enteredText);
  };

  useEffect(() => {
    (async () => {
      const fetchedShows = await fetchTVSeries(searchQuery);
      setShows(fetchedShows);
    })();
  }, [debouncedQuery]);

  return (
    <View>
      <TextInput
        placeholder={translations.searchBar.placeholder}
        onChangeText={handleTextChange}
      />
      <FlatList
        data={shows}
        renderItem={({ item }) => <Text>{item.show.name}</Text>}
        keyExtractor={({ show }) => show.id.toString()}
      />
    </View>
  );
};
