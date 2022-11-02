import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";
import { StyleSheet, View } from "react-native";

interface RatingStarsProps {
  rating: number;
  size: number;
  color: string;
}

export const RatingStars: FC<RatingStarsProps> = ({ color, size, rating }) => {
  const numberOfWholeStars = Math.floor(rating * 5);

  const shouldAddHalfStar = rating * 5 - numberOfWholeStars > 0.25;

  const arrayForIteration = Array.from(Array(numberOfWholeStars));

  return (
    <View style={styles.starContainer}>
      {arrayForIteration.map((_, index) => (
        <Ionicons key={index} name="star" size={size} color={color} />
      ))}
      {shouldAddHalfStar && (
        <Ionicons name="star-half" size={size} color={color} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  starContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 2,
  },
});
