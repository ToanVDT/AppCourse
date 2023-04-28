import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { RegisterUser, UpdateProfile, changePassword } from "../Api/UserAPI";

const SPACING = 10;

export default function PopUpNewPassword({ navigation }) {
  const [codeInput, setCodeInput] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordIsVisible, setPasswordIsVisible] = useState(false);
  const [passwordConfirmIsVisible, setPasswordConfirmIsVisible] = useState(false);

  const route = useRoute();
  const { email } = route.params;


  const HandleChangePassword = async () => {
    if (password.trim() == "" || !password){

      alert("Can not blank password !");

    }
    else if (confirmPassword.trim() == "" || !confirmPassword){

      alert("Can not blank password confirm !");

    }else{
      if (password == confirmPassword ) {
      const res = await changePassword(email,password);
      alert("Change password successful!");
      navigation.navigate("Login");
    } else {
      alert("Password you entered does not match, try again!");
      setConfirmPassword("")
      setPassword("")
    }
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
          fontSize: 23,
          margin: "25%",
          fontWeight: "300",
          fontStyle: "italic",
        }}
      >
        Change Password!
      </Text>
      <View
        style={{
          borderWidth: 1,
          height: "45%",
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
            height: 40,
            width: 250,
            margin: 10,
            top: 50,
            marginLeft: 40,
          }}
        >
          <Text style={{padding:10}}>
            {email}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "white",
            height: 40,
            width: 250,
            margin: 10,
            top: 70,
            marginLeft: 40,
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter password"
            secureTextEntry={!passwordIsVisible}
            placeholderTextColor="#7C808D"
            selectionColor="#3662AA"
            onChangeText={(password) => {
              setPassword(password);
            }}
            value={password}
          />
          <TouchableOpacity
              style={styles.passwordVisibleButton}
              onPress={() => setPasswordIsVisible(!passwordIsVisible)}
            >
              <Feather
                name={passwordIsVisible ? "eye" : "eye-off"}
                size={20}
                color="#7C808D"
              />
            </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "white",
            height: 40,
            width: 250,
            margin: 10,
            top: 100,
            marginLeft: 40,
          }}
        >
          <TextInput
            style={styles.input}
            placeholder="Enter confirm password"
            secureTextEntry={!passwordConfirmIsVisible}
            placeholderTextColor="#7C808D"
            selectionColor="#3662AA"
            onChangeText={(confirmPassword) => {
              setConfirmPassword(confirmPassword);
            }}
            value={confirmPassword}
          />
          <TouchableOpacity
              style={styles.passwordVisibleButton}
              onPress={() => setPasswordConfirmIsVisible(!passwordConfirmIsVisible)}
            >
              <Feather
                name={passwordConfirmIsVisible ? "eye" : "eye-off"}
                size={20}
                color="#7C808D"
              />
            </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{
            flexDirection: "row",
            backgroundColor: "#5ACCD0",
            justifyContent: "center",
            top: 200,
            padding: 15,
            borderRadius: 5,
            width: 150,
            alignSelf: "center",
          }}
          onPress={() =>HandleChangePassword()}
        >
          <Text>Change Password </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: 250,
  },
  passwordVisibleButton: {
    position: "absolute",
    right: 0,
    top:7,
    marginRight:5
  },
});
