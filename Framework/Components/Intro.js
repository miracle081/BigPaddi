import { useEffect, useState, useCallback } from "react";
import { Text, View, SafeAreaView, StyleSheet, Image, TouchableOpacity, ImageBackground } from "react-native";
import { Theme } from "../Components/Theme";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { AppBotton } from "../Components/AppBotton";
import { StatusBar } from "expo-status-bar";

export function Intro({ navigation }) {
    return (
        <View style={{ flex: 1, }}>
            <StatusBar style="light" />
            <View style={styles.constainer}>
                <ImageBackground style={{ flex: 1 }} source={require("../../assets/intro.jpg")} >
                    <LinearGradient
                        start={{ x: 0, y: 1.5 }} end={{ x: 1.5, y: 0 }}
                        colors={['#06003f', '#000000a3']} style={{
                            flex: 1,
                            padding: 20,
                            justifyContent: "space-between",
                        }}
                    >
                        <View style={{ height: 100 }}></View>
                        <View style={{ marginTop: 40 }}>
                            <Text style={{ fontFamily: Theme.fonts.text200, color: "#ffffff", fontSize: 25, textAlign: "center" }}>Welcome to <Text style={{ fontFamily: Theme.fonts.brand, }}>Profiter.</Text></Text>
                            <Text style={{ fontFamily: Theme.fonts.text400, color: "#ffffff", fontSize: 25, textAlign: "center" }}>The billionaire's world.</Text>
                            <Text style={{ fontFamily: Theme.fonts.text200, color: "#ffffff", fontSize: 15, textAlign: "center" }}>Real estate money in your pocket!</Text>
                        </View>

                        <View style={{ gap: 10, marginBottom: 20 }}>
                            <AppBotton onPress={() => navigation.navigate("Signup")}>Get Started</AppBotton>
                            <AppBotton style={{ backgroundColor: "transparent", borderWidth: 0.5, borderColor: "#ffffffd8" }}
                                onPress={() => navigation.navigate("Login")}>Sign In</AppBotton>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
    },
    appBTN: {
        borderWidth: 1,
        borderColor: Theme.colors.primary,
        padding: 10,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 40,
        backgroundColor: Theme.colors.primary
    }
})