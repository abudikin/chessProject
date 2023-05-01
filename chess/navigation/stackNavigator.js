import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import appNavigator from "../navigation/appNavigator";
import SignUpScreen from "../screens/signUpScreen";
import loginScreen from "../screens/loginScreen";
import PasswordResetScreen from "../screens/passwordResetScreen";
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
          options={{headerShown: false}}
          name="appNavigator"
          component={appNavigator}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="SignUpScreen"
          component={SignUpScreen}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="PasswordResetScreen"
          component={PasswordResetScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
