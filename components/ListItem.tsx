import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";

interface ListItemProps {
  imageUri: string;
  name: string;
  rating: number;
}

export const ListItem: FC<ListItemProps> = ({ imageUri, name, rating }) => {
  const { navigate } = useNavigation();

  const itemPressHandler = () => {
    navigate("DetailsScreen");
  };

  return (
    <Pressable
      onPress={itemPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.expenseItem}>
        <View>
          <Text style={[styles.textBase, styles.description]}>{name}</Text>
          {<Ionicons name="star" size={20} color="white" />}
          <Text style={styles.textBase}>{rating}</Text>
        </View>
        <Image style={styles.image} source={{ uri: imageUri }} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  expenseItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary500,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  description: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  amountContainer: {
    minWidth: 80,
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
  },
  amount: {
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
  image: {
    width: 50,
    height: 50,
  },
});
