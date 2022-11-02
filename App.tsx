import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { GlobalStyles } from "./constants/styles";
import { DetailsScreen } from "./screens/DetailsScreen";
import { SearchScreen } from "./screens/SearchScreen";
import translations from "./translations.json";

type RootStackParamList = {
  SearchScreen: undefined;
  DetailsScreen: {
    imageUri?: string;
    name: string;
    rating: number;
    genres: string[];
    summary: string;
    href: string;
  };
};

export type Props = NativeStackScreenProps<RootStackParamList, "DetailsScreen">;

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <>
      <StatusBar style="light" />
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
            options={{ title: translations.headers.search }}
          />
          <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
