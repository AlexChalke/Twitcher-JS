import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import { sql_database } from "../../database/database_controller";
import colors from "../../config/colors";
import RowCard from "../visual/RowCard";
import RowCardRightLeft from "../logic/RowCardRightLeft";
import moment from "moment";

const tableName = "sessions";
const tableId = "SessionId";

const SessionsScreen = ({ navigation, route }) => {
  const [itemData, setItemData] = useState(null);
  const [SessionLocation, setSessionLocation] = useState(null);
  const [SessionDate, setSessionDate] = useState(null);
  async function setupList() {
    try {
      await sql_database.selectAllItems(setItemData, tableName, tableId);
    } catch (error) {
      console.log("Failed to load session data:");
      console.log(error);
    }
  }
  useEffect(() => {
    if (navigation.isFocused()) {
      setupList();
    }
    var date = moment().format("DD-MM-YYYY");
    setSessionDate(date);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sessions</Text>
      <TextInput
        autoCapitalize="words"
        style={styles.textinput}
        autoCorrect={false}
        placeholder="Location"
        onChangeText={(value) => setSessionLocation(value)}
      />
      <Pressable
        style={styles.button}
        title="Add Session"
        onPress={() => {
          sql_database.addItem(
            "INSERT INTO " +
              tableName +
              ' (SessionLocation, SessionDate ) VALUES ("' +
              SessionLocation +
              '", "' +
              SessionDate.toString() +
              '")'
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
            id={item.SessionId}
            name={item.SessionLocation}
            subtitle={item.SessionDate}
            onPress={() =>
              navigation.navigate({
                name: "SessionDetails",
                params: {
                  SessionId: item.SessionId,
                },
              })
            }
            renderRightActions={() => (
              <RowCardRightLeft
                onPress={() => {
                  sql_database.deleteItem(item.SessionId, tableName, tableId);
                  sql_database.deleteItem(item.SessionId, "birds", tableId);
                  setupList();
                }}
              />
            )}
            renderLeftActions={() => (
              <RowCardRightLeft
                onPress={() => {
                  sql_database.deleteItem(item.SessionId, tableName, tableId);
                  sql_database.deleteItem(item.SessionId, "birds", tableId);
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
    marginVertical: 30,
    fontSize: 24,
  },
  container: {
    alignItems: "center",
  },
});

export default SessionsScreen;
