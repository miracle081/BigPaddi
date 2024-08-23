import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AppBotton } from '../Components/AppBotton'
import { Theme } from '../Components/Theme'
import { AppContext } from '../Components/GlobalVariables'

export function Intro({ navigation }) {
    const { userInfo } = useContext(AppContext)

    return (
        <View style={{ flex: 1 }}>
            <ImageBackground source={require("../../assets/Intro2.jpg")} style={styles.bg}>
                <View style={styles.overlay}>
                    <View style={{ marginTop: 40 }}>
                        <Text style={{ fontFamily: Theme.fonts.text300, color: "#ffffff", fontSize: 25, textAlign: "center" }}>Welcome to <Text style={{ fontFamily: Theme.fonts.brand, }}>Big Paddi. {userInfo.fname}</Text></Text>
                        <Text style={{ fontFamily: Theme.fonts.text300, color: "#ffffff", fontSize: 15, textAlign: "center" }}>Real estate money in your pocket!</Text>
                    </View>
                    <AppBotton onPress={() => navigation.navigate("Login")}>Get Started</AppBotton>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    bg: {
        // flex: 1,
        // resizeMode: "cover",
        width: "100%",
        height: "100%",
    },
    overlay: {
        flex: 1,
        justifyContent: "space-between",
        // backgroundColor: Theme.colors.primary + 80,
        backgroundColor: "#00000097",
        padding: 20,
        paddingVertical: 50
    }
})