import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../Screens/HomeScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import CourseScreen from "../Screens/CourseScreen";

import { FontAwesome5 } from "@expo/vector-icons";
import { View, Platform } from "react-native";

const Tab = createBottomTabNavigator();

function BottomTabNavigators() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        unmountOnBlur:true,
        tabBarShowLabel: true,
        tabBarStyle: {
          backgroundColor: "white",
          position: "absolute",
          // Max Height...
          height: 60,
          borderRadius: 10,
          // Shadow...
          shadowColor: "#000",
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
                top: 20,
              }}
            >
              <FontAwesome5
                name="home"
                size={20}
                color={focused ? "#2FDBBC" : "gray"}
              ></FontAwesome5>
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Course"
        component={CourseScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
                top: 20,
              }}
            >
              <FontAwesome5
                name="address-book"
                size={20}
                color={focused ? "#2FDBBC" : "gray"}
              ></FontAwesome5>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View
              style={{
                // centring Tab Button...
                position: "absolute",
                top: 20,
              }}
            >
              <FontAwesome5
                name="user"
                size={20}
                color={focused ? "#2FDBBC" : "gray"}
              ></FontAwesome5>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTabNavigators;
