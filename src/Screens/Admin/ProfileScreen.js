import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { View, Text, StatusBar, Image, TouchableOpacity } from "react-native";

export default function Profile({ navigation }) {
    const [user, setuser] = useState(null);
    // const getUserData = async () => {
    //     let curUser = await AsyncStorage.getItem("curUser");
    //     curUser = JSON.parse(curUser);
    //     setuser(curUser);
    // };
    // const logOut = async () => {
    //     await AsyncStorage.removeItem("curUser");
    //     navigation.reset({
    //         index: 0,
    //         routes: [{ name: "Login" }],
    //     });
    // };
    // useEffect(() => {
    //     getUserData(user);
    // }, []);
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
                    {user && user.name}
                </Text>
                <Text
                    style={{
                        fontSize: 12,
                    }}
                >
                    {user && user.email}
                </Text>
                <Text>
                    Họ và tên: Đỗ Huy Mạnh
                </Text>
                <Text>
                    Lớp: D15CNPM3
                </Text>
                <Text>
                    Mã SV: 20810310319
                </Text>
                <Text>
                    Sđt: 0362465647
                </Text>
                <Text>
                    Địa chỉ: 235 Hoàng Quốc Việt
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
              marginVertical: 50 }} onPress={()=>navigation.navigate("Login")}>
              {/* onPress={logOut} */}
                <Text>LogOut</Text>
            </TouchableOpacity>
        </View>
    );
}
