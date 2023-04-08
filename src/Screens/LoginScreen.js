// @ts-ignore
import { StatusBar } from "expo-status-bar";
// @ts-ignore
import { Feather } from "@expo/vector-icons";
// @ts-ignore
import {Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View, ActivityIndicator, AsyncStorage} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { checkValidToken, Login } from "../Api/AuthAPI";
import jwt_decode from "jwt-decode";
export default function LoginScreen({ navigation }) {
  //   const { setNotifi } = useContext(notifiContext);
  //   const { user, setUser } = useContext(userContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const [passwordIsVisible, setPasswordIsVisible] = useState(false);

  const login = () => {
    if (email.trim() == "" || !email) {
      alert("Không được để trống email !");
    } else if (password.trim() == "" || !password) {
      alert("Không được để trống mật khẩu !");
    } else {
      handleLogin();
    }
  };

  const handleLogin = async () => {
    const res = await Login(email, password);
    if (res.isSuccess == true) {
      await AsyncStorage.setItem('authToken', res.data);
      navigation.navigate("HomeTab");
    } else alert(res.data);
  };

  const checkValidTokenFunction = async () => {
    const authToken = await AsyncStorage.getItem('authToken');
    if (authToken != undefined) {
      const userInfo = jwt_decode(authToken);
      const expiryDate = userInfo.expires;
      const dateNow = new Date();
      //const dateNow = new Date("2023-05-12T23:50:21.817Z"); //uncomment for testing refresh token
      if (dateNow > new Date(expiryDate)) {
        const res = await checkValidToken(userInfo.loginName);
        if (res.isSuccess == true) {
          await AsyncStorage.setItem('authToken', res.data);
          alert('Refreshed auth token successfully');
          navigation.navigate("HomeTab");
        }
        else {
          alert('Auto login fail, please manually login again!');
        }
      }
      else {
        alert('Auto login successfully');
        navigation.navigate("HomeTab");
      }
    }
  };
  useEffect(() => {
    checkValidTokenFunction();
  }, []);

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
        <View>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "bold",
              top: -100,
            }}
          ></Text>
        </View>
        <View style={styles.content}>
          <Text style={styles.title}>Course</Text>
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
            />
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.icon}>
              <Feather name="lock" size={22} color="#7C808D" />
            </View>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!passwordIsVisible}
              placeholderTextColor="#7C808D"
              selectionColor="#3662AA"
              onChangeText={setPassword}
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
          <TouchableOpacity style={styles.forgotPasswordButton}>
            <Text
              style={styles.forgotPasswordButtonText}
              onPress={() => navigation.navigate("Forgot")}
            >
              {" "}
              Forgot password?
            </Text>
          </TouchableOpacity>
          {!loading ? (
        
            <TouchableOpacity
              style={styles.loginButton}
              onPress={login}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.loginButton}>
              <ActivityIndicator size="large" />
            </TouchableOpacity>
          )}
          <View style={styles.orContainer}>
            <View style={styles.orLine} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.orLine} />
          </View>
          <TouchableOpacity
            style={styles.notifi}
            onPress={() => alert("Comming soon...")}
          >
            <Image
              style={styles.googleLogo}
              // @ts-ignore
              source={require("../../assets/google-logo.png")}
            />
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>
              You don't have an account?{" "}
              <Text
                style={styles.registerButtonTextHighlight}
                onPress={() => navigation.navigate("Register")}
              >
                Create one now!
              </Text>
            </Text>
          </TouchableOpacity>
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
    marginBottom: 100,
    textAlign: "center",
    color: "#3662AA",
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
  passwordVisibleButton: {
    position: "absolute",
    right: 0,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
  },
  forgotPasswordButtonText: {
    color: "#3662AA",
    fontSize: 16,
    fontWeight: "500",
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
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  orLine: {
    height: 1,
    backgroundColor: "#eee",
    flex: 1,
  },
  orText: {
    color: "#7C808D",
    marginRight: 10,
    marginLeft: 10,
    fontSize: 14,
  },
  googleButton: {
    backgroundColor: "#F2F6F2",
    padding: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  notifi: {
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  googleButtonText: {
    color: "#4E5867",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
  googleLogo: {
    width: 20.03,
    height: 20.44,
    position: "absolute",
    left: 14,
  },
  registerButton: {
    alignSelf: "center",
    marginTop: 40,
  },
  registerButtonText: {
    fontSize: 16,
    color: "#7C808D",
  },
  registerButtonTextHighlight: {
    fontSize: 16,
    color: "#3662AA",
    fontWeight: "500",
  },
});
