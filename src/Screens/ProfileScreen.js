import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";

import jwt_decode from "jwt-decode";
import {
  CheckExistAndSendConfirmChangeMail,
  GetInfoUser,
  UpdateProfile,
} from "../Api/UserAPI";

const SPACING = 10;

export default function Profile({ navigation }) {
  const [user, setUser] = useState(null);
  const [info, setInfo] = useState({});

  const [username, setUsername] = useState("");

  const [email, setEmail] = useState("");

  const [numberphone, setNumberphone] = useState("");

  const [name, setName] = useState("");

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

      // console.log("userInfo", userInfo.id);

      const res = await GetInfoUser(userInfo.id);
      if (res.isSuccess == true) {
        setInfo(res.data);

        setName(res.data.name);
        setEmail(res.data.email);
        setNumberphone(res.data.telNum);
        setUsername(res.data.loginName);
      }
    }
  };

  // console.log("infoooooooo", info);

  const handleUpdate = async () => {
    if (info.email != email) {
      const respone = await CheckExistAndSendConfirmChangeMail(email);
      if (respone.data != "existed") {

        const codeConfirm = respone.data
        console.log("respone",respone.data)
        alert("Confirm change email code was sent!")
        navigation.navigate("PopUp",{ username:username,name:name,email:email,numberphone:numberphone,code:codeConfirm })

      } else {
        alert("Existed Login Name or Email, try again!");
      }
      // console.log("respone", respone);
    }
    else{
      updateUser()
    }
  };

  const updateUser = async () => {
    const authToken = await AsyncStorage.getItem("authToken");
    if (authToken != undefined) {
      const userInfo = jwt_decode(authToken);
      const res = await UpdateProfile(
        userInfo.id,
        username,
        name,
        email,
        numberphone
      );
      if(res.data){
        alert("Successful")
      }
      else{
        alert("Error")
      }

      // console.log("logtest", res.message);
    }
  };
  // console.log("infoUser", info);
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
      <View style={{ marginTop: -20, marginBottom: 20 }}>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#000",
            backgroundColor: "#93FFE8",
            height: 40,
            paddingLeft: 15,
            marginVertical: SPACING * 2,
          }}
        >
          Profile
        </Text>
      </View>
      <View style={{ flexDirection: "column", alignItems: "center" }}>
        <Text
          style={{
            marginLeft: -225,
            marginBottom: -10,
            fontStyle: "italic",
            color: "#DD0000",
          }}
        >
          Login name
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(username) => {
            setUsername(username);
          }}
          value={username}
        />
        <Text
          style={{
            marginLeft: -260,
            marginBottom: -10,
            fontStyle: "italic",
            color: "#DD0000",
          }}
        >
          Name
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(name) => {
            setName(name);
          }}
          value={name}
        />
        <Text
          style={{
            marginLeft: -260,
            marginBottom: -10,
            fontStyle: "italic",
            color: "#DD0000",
          }}
        >
          Email
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(email) => {
            setEmail(email);
          }}
          value={email}
        />
        <Text
          style={{
            marginLeft: -205,
            marginBottom: -10,
            fontStyle: "italic",
            color: "#DD0000",
          }}
        >
          Number phone
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={(numberphone) => {
            setNumberphone(numberphone);
          }}
          value={numberphone}
        />
      </View>

      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: "#EE6363",
          justifyContent: "center",
          top: 0,
          width: 80,
          marginTop: 0,
          marginLeft: "70%",
          padding: 15,
          borderRadius: 20,
          marginVertical: 50,
        }}
        onPress={() => handleUpdate()}

      >
        <Text style={{ color: "white", fontSize: 15, fontWeight: "600" }}>
          Save
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          backgroundColor: "#2FDBBC",
          justifyContent: "center",
          top: 150,
          marginTop: 0,
          padding: 15,
          borderRadius: 20,
          marginVertical: 50,
        }}
        onPress={() => logOut()}
      >
        <Text>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 300,
  },
});
