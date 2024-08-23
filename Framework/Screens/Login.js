import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBotton } from "../Components/AppBotton";
import { AppContext } from "../Components/GlobalVariables";
import { useContext } from "react";

export function Login({ navigation }) {
    const { setUserInfo } = useContext(AppContext)

    return (
        <ImageBackground source={require("../../assets/Logimage2.jpg")} style={{ height: '100%', width: '100%' }}>
            <SafeAreaView style={styles.overlay}>


                <View style={{ padding: 30, marginTop: 50, alignSelf: 'center', backgroundColor: "#6E3DEB", borderRadius: 50 }}>
                    <FontAwesomeIcon icon={faUserCheck} size={50} color="white" />
                </View>

                <View style={{ margin: 20 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, color: 'white' }}>Login to your Account</Text>
                </View>

                <View style={{ marginTop: 50 }}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Login</Text>

                    <View>
                        <TextInput
                            placeholder="Enter Your Email or Phone Number"
                            style={{ borderRadius: 30 }} />
                    </View>
                </View>

                <View style={{ marginTop: 10 }}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Password</Text>

                    <View>
                        <TextInput
                            placeholder="Enter Password"
                            style={{ borderRadius: 30 }} />
                    </View>
                </View>

                <View style={{ paddingVertical: 50 }}>
                    <AppBotton onPress={() => setUserInfo({ fname: "Ben" })}>Login</AppBotton>
                </View>

                <View style={{ flexDirection: 'row', alignSelf: 'center', }}>
                    <Text style={{ fontSize: 20, color: 'white' }}>Don't have an Account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={{ fontSize: 20, color: 'red' }}> Signup</Text>
                    </TouchableOpacity>

                </View>

            </SafeAreaView>
        </ImageBackground>



    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'flex-end',
        // backgroundColor: Theme.colors.primary + 80,
        backgroundColor: "#00000081",
        padding: 20,
        paddingVertical: 100
    }
})