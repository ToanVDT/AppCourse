import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { SendForgetCode } from "../Api/UserAPI";

export default function ForgotPasswordScreen({ navigation }) {

  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isSendCode, setIsSendCode] = useState(false);
  const [codeCofirm, setCodeCofirm] = useState("");

  const HandleForGotPasswork = async () => {
    const res = await SendForgetCode(email);
    if (res.data != "") {
      console.log("codeConfirm", res.data);

      alert("Confirm forget password code was sent!");

      setCodeCofirm(res.data);
      setIsSendCode(true);
    } else alert("Not existed this email, try again!");
  };

  const HandleConfirmCode = async () => {
    if (codeCofirm == code) {
      alert("Correct code, please enter new password!");
      navigation.navigate("PopUpNewPassword",{email:email})
    } else alert("Wrong confirm code, try again!");
    setCode("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Forgot Password</Text>
          <View style={styles.inputContainer}>
            <View style={styles.icon}>
              <Feather name="mail" size={22} color="#7C808D" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Login name or email"
              placeholderTextColor="#7C808D"
              selectionColor="#3662AA"
              onChangeText={setEmail}
              value={email}
              editable={isSendCode === true ? false : true}
              selectTextOnFocus={isSendCode === true ? false : true}
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.icon}>
              <Feather name="key" size={22} color="#7C808D" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter code"
              placeholderTextColor="#7C808D"
              selectionColor="#3662AA"
              onChangeText={setCode}
              value={code}
              editable={isSendCode === false ? false : true}
              selectTextOnFocus={isSendCode === false ? false : true}
            />
          </View>
          {/* onPress={() => navigation.navigate("PopUpNewPassword")} */}
          {/* ?onPress={onSignUp}/{} */}
          <TouchableOpacity style={styles.loginButton} onPress={()=>isSendCode === false ? HandleForGotPasswork() : HandleConfirmCode()}>
            <Text style={styles.loginButtonText}>
              {isSendCode === false ? "Send code" : "Confrim code"}
            </Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.loginButton}
            onPress={() => HandleForGotPasswork()}
          >
            <Text style={styles.loginButtonText}>test</Text>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "#f01404",
  },
  inputContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    position: "relative",
  },
  icon: {
    marginRight: 15,
  },
  input: {
    borderBottomWidth: 1.5,
    flex: 1,
    paddingBottom: 10,
    borderBottomColor: "#eee",
    fontSize: 16,
  },

  loginButton: {
    backgroundColor: "#3662AA",
    padding: 14,
    borderRadius: 10,
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },
  registerButton: {
    alignSelf: "center",
    marginTop: 40,
  },
  registerButtonText: {
    fontSize: 16,
    color: "#7C808D",
  },
});
