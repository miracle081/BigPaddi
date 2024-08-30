import { SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useContext } from 'react'
import { Button } from 'react-native-paper'
import { Theme } from '../Components/Theme'
import { AppContext } from '../Components/GlobalVariables'
import { Formik } from 'formik'
import * as yup from "yup"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'


const validationSchema = yup.object({
    oldPassword: yup.string().required().min(6).max(20),
    password: yup.string().required().min(6).max(20)
        .oneOf([yup.ref('passwordConfirmation'), null], 'password must match')
})

export function ChangePassword({ navigation, route }) {
    // console.log(route.params.metaData)
    const { email, setEmail } = useContext(AppContext)
    // const [email, setEmail] = useState("")

    return (
        <SafeAreaView style={{ flex: 1 }} >
            <View style={styles.container}>
                <Formik
                    style={{ flex: 1 }}
                    initialValues={{ oldPassword: "", password: "" }}
                    onSubmit={(value) => {
                        console.log(value);
                    }}
                    validationSchema={validationSchema}
                >
                    {(prop) => {
                        return (
                            <View style={styles.form}>
                                <Text style={styles.header}>Change</Text>
                                <Text style={[styles.header, { marginBottom: 20 }]}>Password!</Text>
                                {/* <Text style={styles.placeholder}>Please enter your account email, and a password reset link will be sent to your email.</Text> */}

                                <Text style={styles.placeholder}>Old Password</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    secureTextEntry
                                    onChangeText={prop.handleChange("oldPassword")}
                                    onBlur={prop.handleBlur("oldPassword")}
                                    value={prop.values.oldPassword}
                                />
                                <Text style={[styles.error, { display: prop.touched.oldPassword && prop.errors.oldPassword ? "flex" : "none" }]}>{prop.errors.oldPassword}</Text>

                                <Text style={styles.placeholder}>New Password</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    secureTextEntry
                                    onChangeText={prop.handleChange("password")}
                                    onBlur={prop.handleBlur("password")}
                                    value={prop.values.password}
                                />

                                <Text style={styles.placeholder}>Confirm Password</Text>
                                <TextInput
                                    style={styles.input}
                                    autoCapitalize="none"
                                    secureTextEntry
                                    onChangeText={prop.handleChange("passwordConfirmation")}
                                    onBlur={prop.handleBlur("passwordConfirmation")}
                                    value={prop.values.passwordConfirmation}
                                />
                                <Text style={[styles.error, { display: prop.touched.password && prop.errors.password ? "flex" : "none" }]}>{prop.errors.password}</Text>
                                {/* <Text style={[styles.error, { display: prop.touched.passwordConfirmation && prop.errors.passwordConfirmation ? "flex" : "none" }]}>{prop.errors.passwordConfirmation}</Text> */}

                                <TouchableOpacity onPress={prop.handleSubmit} style={styles.appBTN}>
                                    <Text style={{ fontSize: 16, color: "white", fontFamily: Theme.fonts.text600 }}>Change Password</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}
                </Formik>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "white"
    },
    form: {
        flex: 1,
        justifyContent: "center",
        // alignItems: "center"
    },
    header: {
        fontSize: 35,
        fontFamily: Theme.fonts.text700,
        color: Theme.colors.primary
    },
    input: {
        borderColor: "gray",
        borderWidth: 1,
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        width: "100%",
        fontSize: 18
    },
    placeholder: {
        fontFamily: Theme.fonts.text400,
        marginTop: 10
    },
    error: {
        fontFamily: Theme.fonts.text400,
        color: "#d70000",
        marginStart: 7
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