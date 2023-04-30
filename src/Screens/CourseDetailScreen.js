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

import { useEffect, useState } from "react";
import { EnrollCourse, WithdrawCourse, getCourseById } from "../Api/UserAPI";
import { apiURL } from "../config/config";
export default function CourseDetailScreen({ navigation }) {
  const route = useRoute();
  const { item } = route.params;
  
  const [registerStatus, setRegisterStatus] = useState("Reserved");
  const [isActive, setIsActive] = useState(true);
  const [showBox, setShowBox] = useState(true);
  const [courseData, setCourseData] = useState({});
  const [stateEnroll, setStateEnroll] = useState(false);
  const [stateWithdraw, setStateWithdraw] = useState(false);
  const [stateFeedback, setStateFeedback] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  console.log("item", item);
  const date = new Date();

  const handleButton = (button) =>  {
    setStateEnroll(false);
    setStateWithdraw(false);
    setStateFeedback(false);
    console.log('dasjhdkaj')
    switch(button){
      case 'Enroll':
        setStateEnroll(true);        
        break;
      case 'Withdraw':
        setStateWithdraw(true);
        break;
      case 'Feedback':
        setStateFeedback(true);
        break;   
    }
  }

  const courseById = async () => {
    const authToken = await AsyncStorage.getItem("authToken");

    if (authToken != undefined) {
      const user = jwt_decode(authToken);
      const res = await getCourseById(item.courseId, user.id);
      res.data.imageName = res.data.imageName.split('\\').join('/');
      res.data.imageName = apiURL+`/${res.data.imageName}`; 
      setCourseData(res.data);    
      console.log("resdata",res.data)
      handleButton(res.data.button);
    }
  };
  const HandleEnrollCourse = async () => {
    const authToken = await AsyncStorage.getItem("authToken");

    if (authToken != undefined) {
      const user = jwt_decode(authToken);
      const res = await EnrollCourse(
        user.id,
        courseData.courseId,
        registerStatus,
        date,
        date,
        isActive
      );   
      alert(res);
      courseById();
    }
  };
  const HandleWithdrawCourse = async () => {
    const authToken = await AsyncStorage.getItem("authToken");

    if (authToken != undefined) {
      const user = jwt_decode(authToken);
      const res = await WithdrawCourse(user.id, courseData.courseId);
      alert(res);
      courseById();
    }
  };
  const HandleFeedback = async()=>{

    navigation.navigate("PopUpFeedback",{courseId:courseData.courseId})
    handleButton('Feedback')
    }
  
  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to withdraw this course?",
      [
        {
          text: "Yes",
          onPress: () => {
            HandleWithdrawCourse();
            setShowBox(false);
          },
        },

        {
          text: "No",
        },
      ]
    );
  };
const loadData = async()=>{
   console.log('courseData',courseData?.button)
    handleButton(courseData?.button);
}
  useEffect(() => {
    courseById();
  }, []);

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
            onPress={() => navigation.navigate('HomeTab')}
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
          source={{ uri: courseData.imageName }}
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
            Course Name:{courseData.courseName}{" "}
          </Text>
          <Text style={{ fontSize: 16 }}>Type:{courseData.type}</Text>
          <Text style={{ fontSize: 16 }}>Location:{courseData.location}</Text>
          <Text style={{ fontSize: 16 }}>
            Start time: {moment(courseData.startTime).format("DD-MM-YYYY")}
          </Text>
          <Text style={{ fontSize: 16 }}>
            Registation Closed Date:{" "}
            {moment(courseData.lastDateToRegister).format("DD-MM-YYYY ")}
          </Text>
          <Text style={{ fontSize: 16 }}>
            Last Time To Withdraw:{" "}
            {moment(courseData.lastDateToWithdraw).format("DD-MM-YYYY ")}
          </Text>
          <Text style={{ fontSize: 16 }}>
            End Time: {moment(courseData.endTime).format("DD-MM-YYYY")}
          </Text>
          <Text style={{ fontSize: 16 }}>Price:{courseData.price}$</Text>
          <Text style={{ fontSize: 16 }}>
            Available Capacity:{courseData.classCapacity}
          </Text>
          <Text style={{ fontSize: 16 }}>Description:{courseData.description}</Text>
        </View>

        <View style={styles.fixToText}>
          <Button
            title={stateEnroll === true ? "Enroll" : "Enrolled"}
            disabled={courseData.button !== "Enroll" && stateEnroll === false}
            color={stateEnroll === true ? "#841684" : "#CCCCCC"}
            onPress={() => HandleEnrollCourse()}
          />
          <Button
            title={stateWithdraw === true ? "Withdraw" : "Withdrawed"}
            disabled={courseData.button !== "Withdraw" && stateWithdraw === false}
            color={stateWithdraw === true ? "#841684" : "#CCCCCC"}
            onPress={() => showConfirmDialog()}
          />
          <Button
            title={stateFeedback === true ? "Feedback" : "Feedbacked"}
            disabled={courseData.button !== "Feedback" && stateFeedback === false}
            color={stateFeedback === true ? "#841684" : "#CCCCCC"}
            onPress={() => HandleFeedback()}
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
