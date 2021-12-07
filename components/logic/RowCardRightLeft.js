import React from "react";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { TouchableOpacity } from "react-native-gesture-handler";
import colors from "../../config/colors";

/**
 * RowCardRightLeft
 * @param props
 * Handles swiping left or right on a card on the favourites screen
 * shows a bin icon that when tapped will allow deleting that entry from the films table in the database.
 */
function RowCardRightLeft(props) {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View>
        <Icon name="trash" size={50} color={colors.darkGray} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RowCardRightLeft;
