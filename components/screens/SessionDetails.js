import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
} from "react-native";
import { sql_database } from "../../database/database_controller";
import RowCard from "../visual/RowCard";
import NumericInput from "react-native-numeric-input";
import RowCardRightLeft from "../logic/RowCardRightLeft";

import colors from "../../config/colors";

const tableName = "birds";
const tableId = "BirdId";

const SessionDetails = ({ navigation, route }) => {
  const [itemData, setItemData] = useState(null);
  const [BirdName, setBirdName] = useState(null);
  const [BirdQuantity, setBirdQuantity] = useState(null);
  const SessionId = route.params.SessionId;
  async function setupList() {
    try {
      await sql_database.selectAllItems(setItemData, tableName, tableId);
    } catch (error) {
      console.log("Failed to load Session Details:");
      console.log(error);
    }
  }
  useEffect(() => {
    if (navigation.isFocused()) {
      setupList();
    }
  }, []);
  console.log("session id");
  console.log(SessionId);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Birds</Text>
      <TextInput
        autoCapitalize="words"
        style={styles.textinput}
        autoCorrect={false}
        placeholder="Bird Name"
        onChangeText={(value) => setBirdName(value)}
      />
      <NumericInput
        style={styles.textinput}
        onChange={(value) => setBirdQuantity(value)}
      />
      <Pressable
        style={styles.button}
        onPress={() => {
          sql_database.addItem(
            "INSERT INTO " +
              tableName +
              ' (BirdName, BirdQuantity, SessionId) VALUES ("' +
              BirdName +
              '", ' +
              BirdQuantity +
              ", " +
              SessionId +
              ")"
          );
          setupList();
        }}
      >
        <Text style={styles.buttonText}>Add Session</Text>
      </Pressable>
      <FlatList
        data={itemData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <RowCard
            id={item.BirdId}
            name={item.BirdName}
            subtitle={item.BirdQuantity}
            renderRightActions={() => (
              <RowCardRightLeft
                onPress={() => {
                  sql_database.deleteItem(item.BirdId, tableName, tableId);
                  setupList();
                }}
              />
            )}
            renderLeftActions={() => (
              <RowCardRightLeft
                onPress={() => {
                  sql_database.deleteItem(item.BirdId, tableName, tableId);
                  setupList();
                }}
              />
            )}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    marginVertical: 40,
    paddingHorizontal: 100,
    paddingVertical: 20,
    backgroundColor: colors.baseGreen,
    borderRadius: 4,
  },
  buttonText: {
    color: colors.offWhite,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
  },
  textinput: {
    marginVertical: 40,
    fontSize: 24,
  },
  container: {
    alignItems: "center",
  },
});

export default SessionDetails;
