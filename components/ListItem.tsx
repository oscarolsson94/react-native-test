import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import { RatingStars } from "./RatingStars";
import { GenreList } from "./GenreList";

interface ListItemProps {
  imageUri?: string;
  name: string;
  rating: number;
  genres: string[];
  summary: string;
  href: string;
}

export const ListItem: FC<ListItemProps> = ({
  imageUri,
  name,
  rating,
  genres,
  summary,
  href,
}) => {
  const { navigate } = useNavigation();

  const itemPressHandler = () => {
    navigate("DetailsScreen", {
      imageUri,
      name,
      rating,
      genres,
      summary,
      href,
    });
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
            <RatingStars size={12} color="white" rating={rating} />
          </View>
          <GenreList genres={genres} />
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
    padding: GlobalStyles.spacings.medium,
    marginVertical: GlobalStyles.spacings.small,
    backgroundColor: GlobalStyles.colors.primary400,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: GlobalStyles.borderRadius.small,
    elevation: 3,
    shadowColor: GlobalStyles.colors.gray500,
    shadowRadius: 4,
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.4,
  },
  leftContainer: {
    justifyContent: "space-between",
    flexWrap: "wrap",
    maxWidth: "70%",
  },
  textBase: {
    color: GlobalStyles.colors.primary50,
  },
  titleText: {
    fontSize: GlobalStyles.fontSize.medium,
    marginBottom: GlobalStyles.spacings.xsmall,
    fontWeight: "bold",
  },
  image: {
    width: 70,
    height: 70,
    marginRight: GlobalStyles.spacings.xlarge,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
});
