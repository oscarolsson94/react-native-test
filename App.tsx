import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { GlobalStyles } from "./constants/styles";
import { DetailsScreen } from "./screens/DetailsScreen";
import { FavoritesScreen } from "./screens/FavoritesScreen";
import { SearchScreen } from "./screens/SearchScreen";
import { FavoriteShowsContext } from "./store/show-context";
import translations from "./translations.json";
import { ShowInfo } from "./utils/types";

type RootStackParamList = {
  SearchScreen: undefined;
  DetailsScreen: ShowInfo;
  FavoritesScreen: undefined;
};

export type Props = NativeStackScreenProps<RootStackParamList, "DetailsScreen">;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  const [favoriteShows, setFavoriteShows] = useState<ShowInfo[]>([]);
  return (
    <>
      <StatusBar style="light" />
      <FavoriteShowsContext.Provider
        value={{ favoriteShows, setFavoriteShows }}
      >
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary500,
              },
              headerTitleStyle: {
                color: "white",
              },
            }}
          >
            <Stack.Screen
              name="SearchScreen"
              component={SearchScreen}
              options={{
                title: translations.headers.search,
              }}
            />
            <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
            <Stack.Screen
              name="FavoritesScreen"
              component={FavoritesScreen}
              options={{
                title: translations.headers.favoritesScreen,
                headerTintColor: "white",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </FavoriteShowsContext.Provider>
    </>
  );
}
