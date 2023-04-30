import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
const SPACING = 10;
// @ts-ignore
import jwt_decode from "jwt-decode";
// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { FeedbackCourse } from "../Api/UserAPI";
export default function PopUpFeedback({ navigation }) {
  const [feedbackData, setFeedbackData] = useState("");

  const route = useRoute();
  const { courseId } = route.params;
  const FeedBack = async () => {
    const authToken = await AsyncStorage.getItem("authToken");
    if (authToken != undefined) {
      const userInfo = jwt_decode(authToken);
      const res = await FeedbackCourse(
        userInfo.id,
        courseId,
        userInfo.loginName,
        feedbackData
      );
      console.log("res",res)
      if(res){
        alert(res)
        navigation.navigate("HomeTab");
      }
      else
        alert(res)
    }
  };

  return (
    <View>
      <TouchableOpacity
        style={{
          height: SPACING * 4.5,
          width: SPACING * 4.5,
          backgroundColor: "#93FFE8",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: SPACING * 2.5,
          marginTop: 25,
          marginLeft: 10,
        }}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={SPACING * 2.5} color="#666" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 25,
          margin: "25%",
          marginLeft: 140,
          fontWeight: "300",
          fontStyle: "italic",
        }}
      >
        FeedBack!
      </Text>
      <View
        style={{
          borderWidth: 1,
          height: "50%",
          width: "80%",
          margin: "10%",
          backgroundColor: "#d7e7d8",
          borderRadius: 15,
          marginTop: 0,
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            height: 100,
            width: 250,
            margin: 10,
            top: 100,
            marginLeft: 40,
          }}
        >
          <TextInput
            style={styles.input}
            onChangeText={(feedbackData) => {
              setFeedbackData(feedbackData);
            }}
            value={feedbackData}
            placeholder="Enter feedback"
          />
        </View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: "#5ACCD0",
            justifyContent: "center",
            top: 150,
            padding: 15,
            borderRadius: 5,
            width: 150,
            alignSelf: "center",
          }}
          onPress={() => FeedBack()}
        >
          <Text>Send FeedBack </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 100,
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
});
