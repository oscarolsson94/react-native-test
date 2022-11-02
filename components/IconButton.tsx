import { Pressable, StyleSheet, GestureResponderEvent } from "react-native";
import { GlobalStyles } from "../constants/styles";
import { FC, ReactNode } from "react";

interface IconButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  children: ReactNode;
}

export const IconButton: FC<IconButtonProps> = ({ children, onPress }) => (
  <Pressable style={styles.iconContainer} onPress={onPress}>
    {children}
  </Pressable>
);

const styles = StyleSheet.create({
  iconContainer: {
    padding: GlobalStyles.spacings.xsmall,
  },
});
