import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useState, useEffect } from "react";
// @ts-ignore
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetAllCourse} from "../Api/UserAPI";
import { apiURL } from "../config/config";
import jwt_decode from "jwt-decode";

const { width } = Dimensions.get("window");

const SPACING = 10;

const ITEM_WIDTH = width / 2 - SPACING * 3;

export default function Home({ navigation }) {
  const [loginName, setLoginName] = useState('');
  const [course, setCourse] = useState([]);
  
  const [activeCategory, setActiveCategory] = useState(0);
  console.log("home")
  const getAllCourse = async()=>{
    const authToken = await AsyncStorage.getItem('authToken');
    const user = jwt_decode(authToken);
    setLoginName(user.loginName)
    const res = await GetAllCourse(user.id);
    if(res.isSuccess){
        for (let data of res.data) {
            data.imageName = data.imageName.split('\\').join('/');
            data.imageName = apiURL+`/${data.imageName}`; 
        }
        setCourse(res.data)
    }
    else{
        console.log("res", res)
    }
  }
  useEffect(() => {
    getAllCourse();
  }, []);

  return (
      <SafeAreaView style={{ backgroundColor: '#fff' }}>
          <ScrollView>
              <View style={{ paddingHorizontal: SPACING * 2, paddingVertical: SPACING * 4 }}>
              <View style={{}}>
                  <Text
                      style={{ fontSize: 20, fontWeight: "400", color: '#000', backgroundColor:"#93FFE8", height:40, paddingLeft:15, marginVertical: SPACING * 2, fontWeight: "bold" }}>
                      Hi {loginName} !
                  </Text>
                </View>                
                  <View style={{ paddingVertical: 20 }}>
                      
                      <View
                          style={{
                              flexDirection: "row",
                              flexWrap: "wrap",
                              justifyContent: "space-between",
                              marginVertical: SPACING * 2,
                          }}>
                          {course.map((item, i) => (
                              <TouchableOpacity
                                  style={[
                                      {
                                          flexDirection: 'column',
                                          alignItems: 'center',
                                          width: ITEM_WIDTH,
                                          paddingHorizontal: 15,
                                          borderRadius: SPACING,
                                          position: 'relative',
                                      },
                                      i % 2 !== 0 && {
                                          marginTop: SPACING * 4,
                                          backgroundColor: '#FDE6E6'
                                      },
                                      i % 2 === 0 && {
                                          marginTop: SPACING * 4,
                                          backgroundColor: '#F4F1F9'
                                      },
                                  ]}
                                  key={item.courseId}
                                  onPress={() => navigation.navigate('CourseDetail', { item: item })}
                              >
                                  <Image
                                      style={{ width: "90%", height: 120, borderRadius: SPACING * 2, resizeMode: 'contain', alignItems: 'center', position: 'relative', top: -30 }}
                                      source={{uri:item.imageName}}
                                  />
                                  <View style={{
                                      position: 'relative',
                                      top: -15
                                  }}>
                                      <Text style={{ fontSize: SPACING * 2, fontWeight: "700", }}>
                                          {item.courseName}
                                      </Text>
                                      <Text style={{ fontSize: SPACING * 1.5, color: 'rgb(120,120,120)', marginVertical: SPACING / 2, }} >
                                          {item.price}$
                                      </Text>
                                      <Text style={{ fontSize: SPACING * 1.5, fontWeight: "700", backgroundColor:"#B3D9D9" }} >
                                          AVAILABLE: {item.availableSlot}
                                      </Text>
                                  </View>
                              </TouchableOpacity>
                          ))}
                      </View>
                  </View>
              </View>
          </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({});