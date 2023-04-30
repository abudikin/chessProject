import React from "react";
import { Text, View, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import homeScreen from "../screens/homeScreen";
import settingsScreen from "../screens/settingsScreen";
import listScreen from "../screens/listScreen";
import home from "../assets/home.png";
import setting from "../assets/setting.png";
import list from "../assets/list.png";


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
          name="listScreen"
          component={listScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Image source={list} />,
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
