import { faUserCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { TextInput } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppBotton } from "../Components/AppBotton";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons/faUserEdit";
import { Formik } from "formik";
import * as yup from "yup"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { authentication, db } from "../Firebase/settings";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { AppContext } from "../Components/GlobalVariables";
import { useContext } from "react";

const validation = yup.object({
    fname: yup.string().min(3).max(15).required(),
    lname: yup.string().min(3).max(15).required(),
    phone: yup.string().min(10).max(14).required(),
    email: yup.string().email().min(7).required(),
    password: yup.string().min(8).max(30).lowercase().uppercase().required(),
})

export function Signup({ navigation }) {
    const { setUserInfo, setPreloader, setUserUID } = useContext(AppContext)

    return (
        <ImageBackground source={require("../../assets/Logimage2.jpg")} style={{ height: '100%', width: '100%' }}>
            <SafeAreaView style={styles.overlay}>
                <ScrollView>

                    <View style={{ padding: 30, marginTop: 10, alignSelf: 'center', backgroundColor: "#6E3DEB", borderRadius: 50 }}>
                        <FontAwesomeIcon icon={faUserEdit} size={50} color="white" />
                    </View>

                    <View style={{ margin: 20 }}>
                        <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 30, color: 'white' }}>Create An Account</Text>
                    </View>

                    <Formik
                        initialValues={{ fname: "", lname: "", phone: "", email: "", password: "" }}
                        onSubmit={(values) => {
                            // console.log(values);
                            setPreloader(true)
                            createUserWithEmailAndPassword(authentication, values.email, values.password)
                                .then(data => {
                                    const { uid } = data.user
                                    setUserUID(uid)
                                    setDoc(doc(db, "users", uid), {
                                        firstname: values.fname,
                                        lastname: values.lname,
                                        phone: values.phone,
                                        email: values.email,
                                        profileImage: null,
                                        wallet: 0,
                                        cart: [],
                                        active: true
                                    })
                                        .then(() => {
                                            setPreloader(false)
                                            navigation.replace("HomeScreen")
                                        })
                                        .catch(e => {
                                            setPreloader(false)
                                            console.log(e)
                                        })
                                })
                                .catch(e => console.log(e))
                        }}
                        validationSchema={validation}
                    >
                        {({ values, errors, touched, handleBlur, handleChange, handleSubmit }) => {

                            return (
                                <View style={{}}>
                                    <View style={{ margin: 10, marginTop: 10 }}>
                                        <Text style={{ fontSize: 20, color: 'white' }}>First Name</Text>

                                        <TextInput
                                            placeholder="Enter Your Name"
                                            style={{ borderRadius: 30 }}
                                            onChangeText={handleChange('fname')}
                                            value={values.fname}
                                        />
                                        <Text style={{ fontSize: 14, color: '#f95252', display: errors.fname ? "flex" : "none" }}>{errors.fname}</Text>
                                    </View>

                                    <View style={{ margin: 10, marginTop: 5 }}>
                                        <Text style={{ fontSize: 20, color: 'white' }}>Last name</Text>

                                        <TextInput
                                            placeholder="Enter Your Surname"
                                            style={{ borderRadius: 30 }}
                                            onChangeText={handleChange('lname')}
                                            onBlur={handleBlur('lname')}
                                            value={values.lname}
                                        />
                                        <Text style={{ fontSize: 14, color: '#f95252', display: errors.lname ? "flex" : "none" }}>{errors.lname}</Text>
                                    </View>

                                    <View style={{ margin: 10, marginTop: 5 }}>
                                        <Text style={{ fontSize: 20, color: 'white' }}>Phone Number </Text>

                                        <TextInput
                                            placeholder="Enter Phone Number"
                                            style={{ borderRadius: 30 }}
                                            value={values.phone}
                                            onChangeText={handleChange('phone')}
                                            keyboardType="number-pad"
                                        />
                                        <Text style={{ fontSize: 14, color: '#f95252', display: errors.phone ? "flex" : "none" }}>{errors.phone}</Text>
                                    </View>
                                    <View style={{ margin: 10, marginTop: 5 }}>
                                        <Text style={{ fontSize: 20, color: 'white' }}>Email</Text>
                                        <TextInput
                                            placeholder="Enter Email"
                                            style={{ borderRadius: 30 }}
                                            value={values.email}
                                            onChangeText={handleChange('email')}
                                            autoCapitalize="none"
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
                                        <AppBotton onPress={handleSubmit}>Signup</AppBotton>
                                    </View>
                                </View>
                            )
                        }}
                    </Formik>


                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 30 }}>
                        <Text style={{ fontSize: 20, color: 'white' }}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                            <Text style={{ fontSize: 20, color: 'red' }}> Login</Text>
                        </TouchableOpacity>

                    </View>



                </ScrollView>
            </SafeAreaView>
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,

        // backgroundColor: Theme.colors.primary + 80,
        backgroundColor: "#00000081",
        padding: 20,

    }
})