// import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Button,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
// @ts-ignore
import jwt_decode from "jwt-decode";
// @ts-ignore
import { useRoute } from "@react-navigation/native";
import moment from "../../node_modules/moment/moment";
const SPACING = 10;
const { height } = Dimensions.get("window");
// @ts-ignore
import { Ionicons } from "@expo/vector-icons";
// @ts-ignore
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useState } from "react";
import { EnrollCourse, WithdrawCourse } from "../Api/UserAPI";

export default function CourseDetailScreen({ navigation }) {
  const route = useRoute();
  const { item } = route.params;
  const [registerStatus, setRegisterStatus] = useState("Reserved");
  const [isActive, setIsActive] = useState(true);

  console.log("item", item);
  const date = new Date();

  const HandleEnrollCourse = async () => {
    const authToken = await AsyncStorage.getItem("authToken");

    if (authToken != undefined) {
      const user = jwt_decode(authToken);
      const res = await EnrollCourse(
        user.id,
        item.courseId,
        registerStatus,
        date,
        date,
        isActive
      );
      alert(res);
    }
  };
  const HandleWithdrawCourse = async () => {
    const authToken = await AsyncStorage.getItem("authToken");

    if (authToken != undefined) {
      const user = jwt_decode(authToken);
      const res = await WithdrawCourse(
        user.id,
        item.courseId
      );
      alert(res);
    }
  };

  return (
    <>
      <View>
        <View>
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                height: 45,
                backgroundColor: "#93FFE8",
                paddingRight: "40%",
                paddingTop: 7,
                marginTop: "10%",
                fontWeight: "bold",
              }}
            >
              Course Detail
            </Text>
          </View>
          <TouchableOpacity
            style={{
              height: SPACING * 4.5,
              width: SPACING * 4.5,
              backgroundColor: "#93FFE8",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: SPACING * 2.5,
              marginTop: -45,
            }}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={SPACING * 2.5} color="#666" />
          </TouchableOpacity>
        </View>
        <ImageBackground
          style={{
            padding: SPACING * 2,
            height: height / 2.5,
            // @ts-ignore
            padding: SPACING * 2,
            paddingTop: SPACING * 4,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          resizeMode="contain"
          source={{ uri: item.imageName }}
        ></ImageBackground>
        <View
          style={{
            padding: SPACING * 2,
            paddingTop: SPACING * 3,
            marginTop: -SPACING * 3,
            borderTopLeftRadius: SPACING * 3,
            borderTopRightRadius: SPACING * 3,
            borderBottomEndRadius: SPACING * 3,
            borderBottomLeftRadius: SPACING * 3,
            backgroundColor: "#fff",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Course Name:{item.courseName}{" "}
          </Text>
          <Text style={{ fontSize: 16 }}>Type:{item.type}</Text>
          <Text style={{ fontSize: 16 }}>Location:{item.location}</Text>
          <Text style={{ fontSize: 16 }}>
            Start time: {moment(item.startTime).format("DD-MM-YYYY")}
          </Text>
          <Text style={{ fontSize: 16 }}>
            Registation Closed Date:{" "}
            {moment(item.lastDateToRegister).format("DD-MM-YYYY ")}
          </Text>
          <Text style={{ fontSize: 16 }}>
            Last Time To Withdraw:{" "}
            {moment(item.lastDateToWithdraw).format("DD-MM-YYYY ")}
          </Text>
          <Text style={{ fontSize: 16 }}>
            End Time: {moment(item.endTime).format("DD-MM-YYYY")}
          </Text>
          <Text style={{ fontSize: 16 }}>Price:{item.price}$</Text>
          <Text style={{ fontSize: 16 }}>
            Available Capacity:{item.classCapacity}
          </Text>
          <Text style={{ fontSize: 16 }}>Description:{item.description}</Text>
        </View>

        <View style={styles.fixToText}>
          <Button
            title="Đăng ký"
            color="#841684"
            onPress={() => HandleEnrollCourse()}
          />
          <Button
            title="Hủy"
            color="#ed2718"
            onPress={() => HandleWithdrawCourse()}
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 16,
  },

  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "20%",
    marginTop: "40%",
  },
});
