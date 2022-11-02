import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { ListItem } from "../components/ListItem";
import { useGlobalContext } from "../store/show-context";
import translations from "../translations.json";

export const FavoritesScreen = () => {
  const { favoriteShows } = useGlobalContext();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: translations.headers.favoritesScreen,
      headerTintColor: "white",
    });
  }, [navigation]);
  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteShows}
        renderItem={({ item }) => (
          <ListItem
            name={item.name}
            rating={item.rating}
            imageUri={item.imageUri}
            genres={item.genres.length > 0 ? item.genres : ["Unknown genre"]}
            summary={item.summary}
            href={item.href}
          />
        )}
        keyExtractor={(item) => item.name}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
