import { FC } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface ExternalLinkProps {
  text: string;
  onPress: (event: GestureResponderEvent) => void;
}

export const ExternalLink: FC<ExternalLinkProps> = ({ text, onPress }) => {
  return (
    <Pressable onPress={onPress} style={styles.rowContainer}>
      <Text style={styles.textLink}>{text}</Text>
      <Ionicons name="chevron-forward-outline" color="white" size={20} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  textLink: {
    color: "white",
    textDecorationLine: "underline",
    fontSize: 18,
  },
});
