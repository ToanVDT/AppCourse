import React, { useEffect, useState } from "react";
// @ts-ignore
import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import { GetInfoUser } from "../Api/UserAPI";
export default function Profile({ navigation }) {
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState({});

  const getUserData = async () => {
    const authToken = await AsyncStorage.getItem("authToken");

    const CurrentUser = jwt_decode(authToken);

    console.log("current", CurrentUser);

    setUser(CurrentUser.loginName);
  };

  const getInfoUser = async () => {
    const authToken = await AsyncStorage.getItem("authToken");
    if (authToken != undefined) {
      const userInfo = jwt_decode(authToken);

      console.log("userInfo",userInfo.id)

      const res = await GetInfoUser(userInfo.id);
      if (res.isSuccess == true) {
        // await AsyncStorage.getItem("authToken");

        console.log("ressssss", res);

        setInfo(res.data);
      }
    }
  };
  console.log("infoUser", info);
  const logOut = async () => {
    await AsyncStorage.removeItem("authToken");
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  };
  useEffect(() => {
    getUserData();
    getInfoUser();
  }, []);

  return (
    <View
      style={{
        backgroundColor: "#fff",
        flex: 1,
        width: "100%",
        paddingTop: StatusBar.currentHeight + 30,
        paddingHorizontal: 12,
      }}
    >
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          {user}
        </Text>
        <Text
          style={{
            fontSize: 12,
          }}
        >
         Name: {info.name}
        </Text>
        <Text
          style={{
            fontSize: 12,
          }}
        >
         Email: {info.email}
        </Text>
        <Text
          style={{
            fontSize: 12,
          }}
        >
         TelephoneNumber: {info.telNum}
        </Text>

        <View
          style={{
            flexDirection: "row",
            marginTop: 20,
            paddingBottom: 12,
            borderBottomColor: "gray",
            borderBottomWidth: 1,
          }}
        >
          <Text></Text>
        </View>
        <View
          style={{
            flexDirection: "row",
          }}
        ></View>
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: "#2FDBBC",
          justifyContent: "center",
          top: 200,
          marginTop: "90%",
          padding: 15,
          borderRadius: 20,
          marginVertical: 50,
        }}
        onPress={() => logOut()}
      >
        {/* onPress={logOut} */}
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}
