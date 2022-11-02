import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { RatingStars } from "./RatingStars";

interface ListItemProps {
  imageUri?: string;
  name: string;
  rating: number;
  genres: string[];
  summary: string;
}

export const ListItem: FC<ListItemProps> = ({
  imageUri,
  name,
  rating,
  genres,
  summary,
}) => {
  const { navigate } = useNavigation();

  const itemPressHandler = () => {
    navigate("DetailsScreen", {});
  };

  return (
    <Pressable
      onPress={itemPressHandler}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.showItem}>
        <View style={styles.leftContainer}>
          <View>
            <Text style={[styles.textBase, styles.titleText]}>{name}</Text>
            <View style={styles.starContainer}>
              <RatingStars rating={rating} />
            </View>
          </View>
          <View style={styles.genreContainer}>
            {genres.map((genre) => (
              <Text key={genre} style={[styles.textBase, styles.genreText]}>
                •{genre}
              </Text>
            ))}
          </View>
        </View>
        <View style={styles.rowContainer}>
          <Image
            style={styles.image}
            source={
              imageUri
                ? {
                    uri: imageUri,
                  }
                : require("../assets/images/fallback.jpg")
            }
          />
          <Ionicons name="chevron-forward-outline" size={36} color="white" />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  showItem: {
    padding: 12,
    marginVertical: 8,
    backgroundColor: GlobalStyles.colors.primary400,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  leftContainer: {
    justifyContent: "space-between",
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  genreContainer: {
    flexDirection: "row",
  },
  genreText: {
    fontSize: 12,
    marginRight: 4,
  },
  titleText: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: "bold",
  },
  image: {
    width: 70,
    height: 70,
    marginRight: 20,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  starContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
  },
});
