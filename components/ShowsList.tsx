import { FC } from "react";
import { FlatList, Text } from "react-native";
import { Show } from "../utils/types";
import { ListItem } from "./ListItem";

interface ShowsListProps {
  shows: Show[];
}

export const ShowsList: FC<ShowsListProps> = ({ shows }) => {
  return (
    <FlatList
      data={shows}
      renderItem={({ item }) => (
        <ListItem
          name={item.show.name}
          rating={item.score}
          imageUri={item.show.image?.medium}
          genres={
            item.show.genres.length > 0 ? item.show.genres : ["Unknown genre"]
          }
          summary={item.show.summary}
          href={item.show.url}
        />
      )}
      keyExtractor={({ show }) => show.id.toString()}
    />
  );
};
