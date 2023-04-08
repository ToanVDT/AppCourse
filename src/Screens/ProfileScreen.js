import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt_decode from "jwt-decode";
export default function Profile({ navigation }) {
    const [user, setUser] = useState(null);
    const getUserData = async () => {
        const authToken = await AsyncStorage.getItem('authToken');
        const user = jwt_decode(authToken);
        setUser(user.loginName);
    };
    const logOut = async () => {
        await AsyncStorage.removeItem("authToken");
        navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
        });
    };
    useEffect(() => {
        getUserData();
    }, []);
    return (
        <View
            style={{
                backgroundColor: "#fff",
                flex: 1,
                width: "100%",
                paddingTop: StatusBar.currentHeight + 30,
                paddingHorizontal: 12,
            }}
        >
            <View style={{ flexDirection: 'column', alignItems: "center" }}>
                <Image
                    style={{
                        height: 120,
                        width: 120,
                        borderRadius: 100,
                    }}
                    // source={require("../../assets/manga/manh.png")}
                />
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: "bold",
                    }}
                >
                    {user}
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                    }}
                >
                    {user && user.email}
                </Text>
                
                <View
                    style={{
                        flexDirection: "row",
                        marginTop: 20,
                        paddingBottom: 12,
                        borderBottomColor: "gray",
                        borderBottomWidth: 1,
                    }}
                >
                  

                </View>
                <View
                    style={{
                        flexDirection: "row",
                    }}
                >
                    <Text
                        style={{
                            color: "#2FDBBC",
                            fontSize: 25,
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        {"01"}
                    </Text>
                    <Text
                        style={{
                            color: "#2FDBBC",
                            fontSize: 25,
                            flex: 1,
                            textAlign: "center",
                        }}
                    >
                        {"02"}
                    </Text>
                </View>
                
            </View>

            <TouchableOpacity style={{ 
              flexDirection: 'row', 
              backgroundColor: '#2FDBBC', 
              justifyContent: 'center',
              top: 200 , 
              padding: 15, 
              borderRadius: 20, 
              marginVertical: 50 }} onPress={()=> logOut()}>
              {/* onPress={logOut} */}
                <Text>LogOut</Text>
            </TouchableOpacity>
        </View>
    );
}
