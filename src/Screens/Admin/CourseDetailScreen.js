import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  ImageBackground, 
  Dimensions } from 'react-native';
  import { useRoute } from '@react-navigation/native';
const SPACING = 10;
const { height } = Dimensions.get("window");
import { Ionicons } from "@expo/vector-icons";

import { useState } from 'react';

export default function CourseDetailScreen({ navigation }) {
    const route = useRoute()
    const { item } = route.params;
    console.log(item)
    

    return (
        <View>
          <View>
            <View>
              <Text style={{
                textAlign:"center",
                fontSize:20,
                height:45,
                backgroundColor:"#93FFE8",
                paddingRight:"40%",
                paddingTop:7,
                marginTop:"10%",
                fontWeight:"bold"}}>Course Detail</Text>
            </View>
            <TouchableOpacity
                style={{
                    height: SPACING * 4.5,
                    width: SPACING * 4.5,
                    backgroundColor: '#93FFE8',
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: SPACING * 2.5,
                    marginTop:-45,
                }}
                onPress={() => navigation.goBack()}>           
                <Ionicons
                    name="arrow-back"
                    size={SPACING * 2.5}
                    color='#666'/>                           
            </TouchableOpacity>
          </View>
          <ImageBackground
            style={{
                padding: SPACING * 2,
                height: height / 2.5,
                padding: SPACING * 2,
                paddingTop: SPACING * 4,
                flexDirection: "row",
                justifyContent: "space-between",
            }}
            resizeMode="contain"
            source={item.imageName}>
          </ImageBackground>
          <View style={{
            padding: SPACING * 2,
            paddingTop: SPACING * 3,
            marginTop: -SPACING * 3,
            borderTopLeftRadius: SPACING * 3,
            borderTopRightRadius: SPACING * 3,
            borderBottomEndRadius:SPACING * 3,
            borderBottomLeftRadius:SPACING * 3,
            backgroundColor: '#fff',
          }}>
            
            <Text style={{fontSize:15}}>Course Name:{item.courseName} </Text>
            <Text style={{fontSize:15}}>Type:{item.type}</Text>
            <Text style={{fontSize:15}}>Location:{item.location}</Text>
            <Text style={{fontSize:15}}>Start time:{item.startTime}</Text>
            <Text style={{fontSize:15}}>Registation Closed Date:{item.lastDateToRegister}</Text>
            <Text style={{fontSize:15}}>Last Time To Withdraw:{item.lastDateToWithdraw}</Text>
            <Text style={{fontSize:15}}>End Time:{item.endTime}</Text>
            <Text style={{fontSize:15}}>Price:{item.price}$</Text>
            <Text style={{fontSize:15}}>Available Capacity:{item.classCapacity}</Text>
            <Text style={{fontSize:15}}>Description:{item.description}</Text>
          </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});