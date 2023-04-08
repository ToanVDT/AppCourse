import React, { useState } from 'react';
import { Feather } from "@expo/vector-icons";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableHighlight,
    View,
} from 'react-native';
import {
  Provider,
  Button,
  Dialog,
  DialogHeader,
  DialogContent,
  DialogActions,
  } from "@react-native-material/core";
import { SafeAreaView } from 'react-native-safe-area-context';

import { SwipeListView } from 'react-native-swipe-list-view';
import Courses from "../data/AllCourseX.json";



export default function CourseScreen({navigation}) {
    const [visible, setVisible] = useState(false);
    const [pos, setPos] = useState();
    const [data, setData] = useState();
    const [listData, setListData] = useState(Courses.data);
        
    const closeRow = (rowMap, rowKey) => {
        if (rowMap[rowKey]) {
            rowMap[rowKey].closeRow();
        }
    };

    const deleteRow = (rowMap, rowKey) => {
        closeRow(rowMap, rowKey);
        const prevIndex = listData.filter((item) => item.key !== rowKey)
        setListData(prevIndex);
    };

    const onRowDidOpen = rowKey => {
        console.log('This row opened', rowKey);
    };

    const renderItem = data => {
        
        return(
        <TouchableHighlight
    
            key={data.item.courseId}
            onPress={() => navigation.navigate('CourseDetail',{item:data.item})}
            
            style={styles.rowFront}
            underlayColor={'#AAA'}
        >
            <View>
                <Text>{data.item.courseName}</Text>
            </View>
        </TouchableHighlight>
    )};

    const renderHiddenItem = (data, rowMap) => {
        
        return(
        <View style={[styles.rowBack]}>
            {/* <Text style={styles.backLeftBtn} onPress={()=>navigation.navigate("RosterRegister")}>
            <Feather name="clipboard" size={22} color="black"></Feather>
                Roster Register</Text> */}
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnLeft]}
                onPress={() => closeRow(rowMap, rowKey)}
            >
                <Text style={styles.backTextWhite} onPress={()=> navigation.navigate("EditCourse")}>
                    <Feather name="edit" size={22} color="#7C808D"></Feather>
                    Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.backRightBtn, styles.backRightBtnRight]}
                onPress={() => {
                    setVisible(true);
                    setPos([rowMap, data.item.key]);
                    setData([data.item.courseName])}}
            >
                <Text style={styles.backTextWhite}>
                <Feather name="trash-2" size={22} color="#7C808D"></Feather>
                    Delete
                    </Text>
            </TouchableOpacity>
        </View>
    )};
    
    return (
        <Provider>
        <SafeAreaView style={styles.container}>
          <View style={{marginTop:"10%",backgroundColor:"#93FFE8",height:40}}>
            <Text style={{
                color:"black",
                fontSize:20,
                fontWeight:"bold",
                paddingLeft:15,
                padingTop:20}}>Khóa đã đăng ký</Text>
          </View>
            <SwipeListView              
                data={listData}
                renderItem={renderItem}
                renderHiddenItem={renderHiddenItem}
                leftOpenValue={75}
                rightOpenValue={-150}
                previewRowKey={'0'}
                previewOpenValue={-40}
                previewOpenDelay={3000}
                onRowDidOpen={onRowDidOpen}
            />
        </SafeAreaView>
        <Dialog visible={visible} onDismiss={() => setVisible(false)}>
                <DialogHeader title="Delete Course"/>
                    <DialogContent>
                    <Text>
                        Delete Course:{data}?
                    </Text>
                </DialogContent>
                <DialogActions>
                <Button
                    title="Cancel"
                    compact
                    variant="text"
                    onPress={() =>setVisible(false)}
                />
                <Button
                    title="Ok"
                    compact
                    variant="text"
                    onPress={() => {deleteRow(pos[0],pos[1]);
                    setVisible(false)}}/>
                </DialogActions>
            </Dialog>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        
    },
    createCourse:{
        color: '#000',
    },
    backTextWhite: {
        color: '#FFF',
    },
    rowFront: {
        marginTop:"4%",
        alignItems: 'center',
        backgroundColor: '#CCC',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        justifyContent: 'center',
        height: 50,
    },
    rowBack: {
      marginTop:"4%",
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    backRightBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
    },
    backRightBtnLeft: {
        backgroundColor: 'blue',
        right: 75,
    },
    backRightBtnRight: {
        backgroundColor: 'red',
        right: 0,
    },
    backLeftBtn: {
        alignItems: 'center',
        bottom: 0,
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        width: 75,
        color:'white',
        backgroundColor: 'green',
        left: 0,
    },
    
});