import React, { FC } from "react";
import { ActivityIndicator, StyleSheet, TextInput, View } from "react-native";
import translations from "../translations.json";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/styles";

interface SearchBarProps {
  onTextChange: (text: string) => void;
  isLoading: boolean;
}

export const SearchBar: FC<SearchBarProps> = ({ onTextChange, isLoading }) => {
  const handleTextChange = (enteredText: string) => {
    onTextChange(enteredText);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons
          name="search-outline"
          size={24}
          color={GlobalStyles.colors.primary700}
        />
      </View>
      <TextInput
        style={styles.input}
        placeholder={translations.searchBar.placeholder}
        onChangeText={handleTextChange}
      />
      <View style={styles.loaderContainer}>
        {isLoading && (
          <ActivityIndicator
            size="small"
            color={GlobalStyles.colors.primary700}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: GlobalStyles.spacings.small,
    marginVertical: GlobalStyles.spacings.small,
    paddingHorizontal: GlobalStyles.spacings.xxlarge,
    backgroundColor: GlobalStyles.colors.primary100,
    borderRadius: GlobalStyles.borderRadius.small,
  },
  iconContainer: { width: "10%" },
  loaderContainer: { width: "10%" },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: GlobalStyles.spacings.small,
    fontSize: GlobalStyles.fontSize.large,
    width: "80%",
  },
});
