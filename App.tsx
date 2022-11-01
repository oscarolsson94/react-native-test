import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { GlobalStyles } from "./constants/styles";
import { DetailsScreen } from "./screens/DetailsScreen";
import { SearchScreen } from "./screens/SearchScreen";
import translations from "./translations.json";

const Stack = createNativeStackNavigator();

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
          <Stack.Screen
            name="DetailsScreen"
            component={DetailsScreen}
            options={{
              presentation: "modal",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
