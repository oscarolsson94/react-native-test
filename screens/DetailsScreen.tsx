import { useLayoutEffect } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Linking,
  ScrollView,
  Pressable,
} from "react-native";
import { Props } from "../App";
import { RatingStars } from "../components/RatingStars";
import { GlobalStyles } from "../constants/styles";
import { Ionicons } from "@expo/vector-icons";
import translations from "../translations.json";
import { GenreList } from "../components/GenreList";
import { ExternalLink } from "../components/ExternalLink";
import { useGlobalContext } from "../store/show-context";

export const DetailsScreen = ({ route, navigation }: Props) => {
  const { name, rating, genres, summary, imageUri, href } = route.params;
  const { favoriteShows, setFavoriteShows } = useGlobalContext();

  const showIsAFavorite = favoriteShows.find((show) => show.name === name);

  /* remove <p> and <b> html tags */
  const cleanSummary = summary?.replace(/<\/?p[^>]*>|<\/?b[^>]*>/g, "");

  const handleLinkPress = async () => {
    await Linking.openURL(href);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name,
      headerTintColor: "white",
      headerRight: ({ tintColor }) =>
        showIsAFavorite ? (
          <Pressable
            style={styles.iconContainer}
            onPress={() => {
              setFavoriteShows([
                ...favoriteShows.filter((show) => show.name !== name),
              ]);
            }}
          >
            <Ionicons name="star" color={tintColor} size={20} />
          </Pressable>
        ) : (
          <Pressable
            style={styles.iconContainer}
            onPress={() => {
              setFavoriteShows([...favoriteShows, route.params]);
            }}
          >
            <Ionicons name="star-outline" color={tintColor} size={20} />
          </Pressable>
        ),
    });
  }, [favoriteShows, setFavoriteShows]);

  return (
    <ScrollView style={styles.rootContainer}>
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
      <View style={styles.bottomContainer}>
        <View style={[styles.rowContainer, styles.spaceBetween]}>
          <View>
            <Text style={[styles.textBase, styles.title]}>{name}</Text>
            <GenreList genres={genres} />
          </View>
          <RatingStars size={16} color="white" rating={rating} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.textBase}>{cleanSummary}</Text>
        </View>
        <ExternalLink
          text={translations.detailsScreen.readMoreOnSite}
          onPress={handleLinkPress}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    backgroundColor: GlobalStyles.colors.primary500,
  },
  bottomContainer: {
    padding: GlobalStyles.spacings.large,
  },
  rowContainer: {
    flexDirection: "row",
  },
  spaceBetween: {
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
    height: 300,
  },
  textBase: {
    color: "white",
  },
  title: {
    fontSize: GlobalStyles.fontSize.xlarge,
    fontWeight: "bold",
  },
  textContainer: {
    marginTop: GlobalStyles.spacings.medium,
    paddingVertical: GlobalStyles.spacings.medium,
    borderTopColor: "white",
    borderTopWidth: 2,
  },
  iconContainer: {
    padding: GlobalStyles.spacings.xsmall,
  },
});
