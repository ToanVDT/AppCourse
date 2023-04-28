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

import { RegisterUser, UpdateProfile } from "../Api/UserAPI";

const SPACING = 10;

export default function PopUpRegister({ navigation }) {
  const [codeInput, setCodeInput] = useState("");

  const route = useRoute();
  const { loginName, fullname,password, teleNum,email, codeConfirm } = route.params;

  const confirmEmail = async () => {
    if (codeInput == codeConfirm) {
        const res = await RegisterUser(
          loginName,
          fullname,
          password,
          teleNum,
          email
        );
      alert("Correct code!");
      navigation.navigate("Login")
    } else {
      alert(" Wrong confirm code, try again!");
      setCodeInput("")
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
          fontWeight: "300",
          fontStyle: "italic",
        }}
      >
        Check Your Email!
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
        <Text style={{ padding: 20, fontSize: 15, fontStyle: "italic" }}>
          We just sent a confirmation code over to {email}.
        </Text>
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
            onChangeText={(codeInput) => {
              setCodeInput(codeInput);
            }}
            value={codeInput}
            placeholder="Enter code"
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
          onPress={() => confirmEmail()}
        >
          <Text>Confirm code </Text>
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
});
