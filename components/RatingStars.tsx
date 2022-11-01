import { Ionicons } from "@expo/vector-icons";
import { FC } from "react";

export const RatingStars: FC<{ rating: number }> = ({ rating }) => {
  const numberOfWholeStars = Math.floor(rating * 5);

  const shouldAddHalfStar = rating * 5 - numberOfWholeStars > 0.25;

  const arrayForIteration = Array.from(Array(numberOfWholeStars));

  return (
    <>
      {arrayForIteration.map((_, index) => (
        <Ionicons key={index} name="star" size={12} color="white" />
      ))}
      {shouldAddHalfStar && (
        <Ionicons name="star-half" size={12} color="white" />
      )}
    </>
  );
};
