import React from "react";
import { StyleSheet, Text, View, TouchableHighlight } from "react-native";
import colors from "../../config/colors";
import Swipeable from "react-native-gesture-handler/Swipeable";

const RowCard = ({
  onPress,
  name,
  id,
  subtitle,
  renderRightActions,
  renderLeftActions,
}) => {
  return (
    <Swipeable
      key={id}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
    >
      <TouchableHighlight
        style={styles.rowCard}
        activeOpacity={0.6}
        underlayColor={colors.offWhite}
        onPress={onPress}
      >
        <View style={styles.rowCard}>
          <View style={styles.titleRow}>
            <Text style={styles.titleText}>{name}</Text>
          </View>
          <View style={styles.subtitleRow}>
            <Text style={styles.subtitleText}>{subtitle}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  rowCard: {
    flexDirection: "row",
    alignContent: "flex-end",
    width: "100%",
    backgroundColor: colors.highlightPurple,
    marginVertical: 10,
  },
  titleRow: {
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  titleText: {
    color: colors.offWhite,
    fontWeight: "bold",
    fontSize: 25,
  },
  subtitleText: {
    color: colors.offWhite,
    fontWeight: "bold",
    fontSize: 18,
  },
});

export default RowCard;
