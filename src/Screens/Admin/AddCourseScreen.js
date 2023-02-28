import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  SafeAreaView,  
  TextInput } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { Ionicons } from "@expo/vector-icons";
import AntDesign from 'react-native-vector-icons/AntDesign';


  const SPACING = 10;
  const data= [{ label: 'Offline', value: '1' },
              { label: 'Online', value: '2' },]; 
  const data1= [{ label: 'In Planning', value: '1' },
               { label: 'In Processing', value: '2' },
               { label: 'In Completed', value: '3' },];

  export default function  AddCourseScreen({navigation}){
    const [text, onChangeText] = useState('');
    const [number, onChangeNumber] = useState('');

    const [value, setValue] = useState(null);
    const [value1, setValue1] = useState(null);



    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        </View>
      );
    };
    const renderItem1 = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.textItem}>{item.label}</Text>
          {item.value === value1 && (
            <AntDesign
              style={styles.icon}
              color="black"
              name="Safety"
              size={20}
            />
          )}
        </View>
      );
    };
      
    return (
      <SafeAreaView>
        <View>
          <Text style={{
            textAlign:"center",
            fontSize:20,
            height:45,
            backgroundColor:"#93FFE8",
            paddingRight:"40%",
            paddingTop:7,
            marginTop:"10%",
            fontWeight:"bold"}}>Create Course</Text>
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
        <TextInput 
          style={
            {height: 40,
            margin: 12,
            width:"40%",
            borderWidth: 1,
            padding: 10,
          }}          
            onChangeText={onChangeNumber}
            value={number}
            placeholder="ID Course"
            keyboardType="numeric"/>
         <TextInput 
            style={
              {height: 40,
              margin: 12,
              width:180,
              borderWidth: 1,
              padding: 10,
              marginLeft:"50%",
              marginTop:-52,
        }}
            onChangeText={onChangeText}
            placeholder="Course Name"
            value={text}/>
          <TextInput 
            style={styles.container}
              onChangeText={onChangeText}
              placeholder="Start Time"
              value={text}/>
            <TextInput 
            style={styles.container}
              onChangeText={onChangeText}
              placeholder="End Time"
              value={text}/>
            <TextInput 
           style={styles.container}
              onChangeText={onChangeText}
              placeholder="Last Date To Register"
              value={text}/>
            <TextInput 
              style={styles.container}
                onChangeText={onChangeText}
                placeholder="Last Date To Withdraw"
                value={text}
                />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Training Type"
              // searchPlaceholder="Search..."
              value={value}
              onChange={item => {
                setValue(item.value);
              }}
              
              renderItem={renderItem}
            />
            <Dropdown
              style={styles.dropdown}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={data1}
              // search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder="Select Training Status"
              // searchPlaceholder="Search..."
              value={value1}
              onChange={item => {
                setValue1(item.value);
              }}
              
              renderItem={renderItem1}
            />
    </SafeAreaView>
      );
    }
   
const styles = StyleSheet.create({
  container: {
    height: 40,
    margin: 12,
    width:180,
    borderWidth: 1,
    padding: 10,
    marginLeft:"50%",
    marginTop:30,
  },
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

