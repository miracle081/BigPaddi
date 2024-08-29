import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBotton } from "../Components/AppBotton";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons/faUserEdit";
import { Formik } from "formik";
import * as yup from "yup"
import { signInWithEmailAndPassword } from "firebase/auth";
import { authentication } from "../Firebase/settings";
import { AppContext } from "../Components/GlobalVariables";
import { useContext } from "react";

const validation = yup.object({
    email: yup.string().email().min(7).required(),
    password: yup.string().min(8).max(30).lowercase().uppercase().required(),
})


export function Login({ navigation }) {
    const { setUserInfo, setPreloader, setUserUID } = useContext(AppContext)

    return (
        <ImageBackground source={require("../../assets/Logimage2.jpg")} style={{ height: '100%', width: '100%' }}>
            <SafeAreaView style={styles.overlay}>


                <View style={{ padding: 30, marginTop: 50, alignSelf: 'center', backgroundColor: "#6E3DEB", borderRadius: 50 }}>
                    <FontAwesomeIcon icon={faUserCheck} size={50} color="white" />
                </View>

                <View style={{ margin: 20 }}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, color: 'white' }}>Login to your Account</Text>
                </View>

                <Formik
                    initialValues={{ email: "john@gmail.com", password: "password" }}
                    onSubmit={(values) => {
                        // console.log(values);
                        setPreloader(true)
                        signInWithEmailAndPassword(authentication, values.email, values.password)
                            .then(data => {
                                const { uid } = data.user
                                setUserUID(uid)
                                setPreloader(false)
                                navigation.replace("HomeScreen")
                            })
                            .catch(e => {
                                setPreloader(false)
                                console.log(e)
                            })
                    }}
                    validationSchema={validation}
                >
                    {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {

                        return (
                            <View style={{}}>
                                <View style={{ margin: 10, marginTop: 5 }}>
                                    <Text style={{ fontSize: 20, color: 'white' }}>Email</Text>
                                    <TextInput
                                        placeholder="Enter Email"
                                        style={{ borderRadius: 30 }}
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                    />
                                    <Text style={{ fontSize: 14, color: '#f95252', display: errors.email ? "flex" : "none" }}>{errors.email}</Text>
                                </View>

                                <View style={{ margin: 10, marginTop: 5 }}>
                                    <Text style={{ fontSize: 20, color: 'white' }}>Password</Text>
                                    <TextInput
                                        placeholder="Enter Password"
                                        style={{ borderRadius: 30 }}
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        autoCapitalize="none"
                                        autoCorrect={false}
                                        secureTextEntry={true}
                                    />
                                    <Text style={{ fontSize: 14, color: '#f95252', display: errors.password ? "flex" : "none" }}>{errors.password}</Text>
                                </View>
                                <View style={{ marginTop: 30 }}>
                                    <AppBotton onPress={() => handleSubmit()}>Log In</AppBotton>
                                </View>
                            </View>
                        )
                    }}
                </Formik>

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