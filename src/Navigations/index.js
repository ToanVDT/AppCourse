import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../Screens/HomeScreen';
import CourseScreen from '../Screens/CourseScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import ForgotPasswordScreen from '../Screens/ForgotPasswordScreen';
import UserManagerScreen from '../Screens/UserManagerScreen';
import CourseDetailScreen from '../Screens/CourseDetailScreen';
import BottomTabNavigator from './BottomTabNavigators';
import AddCourseScreen from '../Screens/AddCourseScreen';


const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Course" component={CourseScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Forgot" component={ForgotPasswordScreen} />
        <Stack.Screen name="UserManager" component={UserManagerScreen} />
        <Stack.Screen name="CourseDetail" component={CourseDetailScreen} />
        <Stack.Screen name="HomeTab" component={BottomTabNavigator} />
        <Stack.Screen name="AddCourse" component={AddCourseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
export default AppNavigation;