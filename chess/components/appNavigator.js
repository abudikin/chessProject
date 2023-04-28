import React from "react";
import { Text, View, Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import homeScreen from "./homeScreen";
import settingsScreen from "./settingsScreen";
import home from "../assets/home.png";
import setting from "../assets/setting.png";

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveBackgroundColor: "#BC6C25",
          tabBarInactiveBackgroundColor: "#DDA15E",
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="homeScreen"
          component={homeScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Image source={home} />,
          }}
        />
        <Tab.Screen
          name="settingsScreen"
          component={settingsScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Image source={setting} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;