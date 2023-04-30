import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import appNavigator from "../navigation/appNavigator";
import HomeScreen from "../screens/homeScreen";
import loginScreen from "../screens/loginScreen";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="loginScreen"
          component={loginScreen}
        />
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
