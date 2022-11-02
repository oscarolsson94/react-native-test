import { FC } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GlobalStyles } from "../constants/styles";

interface GenreListProps {
  genres: string[];
}

export const GenreList: FC<GenreListProps> = ({ genres }) => (
  <View style={styles.genreContainer}>
    {genres.map((genre) => (
      <Text key={genre} style={[styles.textBase, styles.genreText]}>
        • {genre}
      </Text>
    ))}
  </View>
);

const styles = StyleSheet.create({
  textBase: {
    color: "white",
  },
  genreContainer: {
    flexDirection: "row",
  },
  genreText: {
    fontSize: GlobalStyles.fontSize.small,
    marginRight: GlobalStyles.spacings.xxsmall,
  },
});
