import { useLayoutEffect } from "react";
import { Text } from "react-native";
import { Props } from "../App";
import { ListItemProps } from "../components/ListItem";

export const DetailsScreen = ({ route, navigation }: Props) => {
  const { name, rating, genres, summary, imageUri } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
    });
  }, []);

  return <Text>DetailsScreen</Text>;
};
