import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import SessionDetails from "./components/screens/SessionDetails";
import SessionsScreen from "./components/screens/SessionsScreen";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { sql_database } from "./database/database_controller";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import colors from "./config/colors";

const Stack = createStackNavigator(); //used to get the program to the selection screen

export default function App() {
  useEffect(() => {
    //sets up database when the app is loaded
    async function setupList() {
      try {
        await sql_database.createDatabase();
        console.log("Created Database");
      } catch (e) {
        console.warn(e);
      }
    }

    setupList();
  }, []);
  return (
    //takes the user the user type selection screen first and then directs the app to either of the tab navigator
    <>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="SessionScreen"
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.baseGreen,
            },
            headerTintColor: colors.offWhite,
          }}
        >
          <Stack.Screen
            name="SessionsScreen"
            component={SessionsScreen}
          ></Stack.Screen>
          <Stack.Screen
            name="SessionDetails"
            component={SessionDetails}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
