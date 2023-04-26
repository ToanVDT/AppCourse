import React, { useState, useEffect } from "react";

import jwt_decode from "jwt-decode";
// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";

import { GetJoiningCourse } from "../Api/UserAPI.js";
import { StatusBar, Text, View } from "react-native";
import moment from "../../node_modules/moment/moment";

export default function CourseScreen({ navigation }) {
  const [visible, setVisible] = useState(false);

  const [listCourse, setListCourse] = useState([]);
  const [loadData, setLoadData] = useState(0)
  console.log("start")

  const getCourseUserJoin = async () => {

    console.log("eeee")
    const authToken = await AsyncStorage.getItem("authToken");

    // console.log("authToken",authToken)

    if (authToken != undefined) {
      const userInfo = jwt_decode(authToken);

      // console.log("userInfo", userInfo.id);

      const res = await GetJoiningCourse(userInfo.id);
      // console.log("res",res)

      if (res.isSuccess == true) {
        setListCourse(res.data);
      }
    }
  };

  useEffect(() => {
    getCourseUserJoin();
  }, []);

  // console.log("listCourse", listCourse);
  return (
    <>
      <Text
        style={{
          fontSize: 20,
          color: "#000",
          backgroundColor: "#93FFE8",
          height: 40,
          paddingLeft: 15,
          borderRadius:15,
          fontWeight: "bold",
          marginTop: "10%",
          marginBottom:40,
          paddingTop:5,
        }}
      >
        Registered Course
      </Text>
      {listCourse.map((item, i) => (
        <View
          style={{
            margin: "7%",
            // borderRadius: 2,
            backgroundColor: "#DDDDDD",
            height: "14%",
            marginTop:-10,
          }}
          key={i}
        >
          <Text style={{fontSize:20,fontStyle:"italic", fontWeight:"bold"}}>Course Name: {item.courseName}</Text>
          <Text style={{fontSize:20,fontStyle:"italic"}}>Start Time: {moment(item.startTime).format("DD-MM-YYYY")}</Text>
          <Text style={{fontSize:20,fontStyle:"italic"}}>Type: {item.type}</Text>
        </View>
      ))}
    </>
  );
}
