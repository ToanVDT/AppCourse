import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../Screens/Admin/HomeScreen';
import CourseScreen from '../Screens/Admin/CourseScreen';
import ProfileScreen from '../Screens/Admin/ProfileScreen';
import LoginScreen from '../Screens/Admin/LoginScreen';
import RegisterScreen from '../Screens/Admin/RegisterScreen';
import ForgotPasswordScreen from '../Screens/Admin/ForgotPasswordScreen';
import UserManagerScreen from '../Screens/Admin/UserManagerScreen';
import CourseDetailScreen from '../Screens/Admin/CourseDetailScreen';
import BottomTabNavigator from './BottomTabNavigators';
import AddCourseScreen from '../Screens/Admin/AddCourseScreen';
import EditCourseScreen from '../Screens/Admin/EditCourseScreen';
import RosterRegisterScreen from '../Screens/Admin/RosterRegisterScreen';


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
        <Stack.Screen name="EditCourse" component={EditCourseScreen} />
        <Stack.Screen name="RosterRegister" component={RosterRegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}
export default AppNavigation;