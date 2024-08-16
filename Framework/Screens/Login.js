import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Theme } from '../Components/Theme'
import { TextInput } from 'react-native-paper'

export function Login() {
    return (
        <ImageBackground source={require("../../assets/Intro2.jpg")} style={styles.bg}>
            <View>
                <View style={{ alignItems: 'center', marginTop: 70 }}>
                    <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 20, color: '#b39a0e' }}>LOG IN TO YOUR ACCOUNT</Text>
                </View>

                <View>
                    <View style={{ marginTop: 20 }}>
                        <TextInput
                            placeholder="Enter Email or Phone Number"
                            placeholderTextColor='grey'
                            borderWidth="2"
                            borderColor='#b39a0e'
                        />
                    </View>

                    <View style={{ marginTop: 3 }}>
                        <TextInput
                            placeholder="Enter Password"
                            placeholderTextColor='grey'
                            borderWidth="2"
                            borderColor='#b39a0e'
                        />
                    </View>

                </View>
            </View>

            <TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>LOG IN</Text>
                </View>
            </TouchableOpacity>


            <View style={{ backgroundColor: "#292828c5", padding: 30, borderRadius: 50, height: 90, width: 90, alignItems: 'center', marginTop: 50, marginLeft: 160 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#b39a0e' }}>OR</Text>
            </View>

            <View style={{ alignItems: 'center', marginTop: 40 }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold', marginLeft: 20, color: '#b39a0e' }}>LOG IN TO YOUR ACCOUNT</Text>
            </View>

            <View style={{ flexDirection: 'row', }}>
                <View style={{ marginTop: 20 }}>
                    <TextInput
                        placeholder="Enter Name"
                        placeholderTextColor='grey'
                        borderWidth="2"
                        borderColor='#b39a0e'
                        width={200}

                    />
                </View>

                <View style={{ marginTop: 20, marginLeft: 2 }}>
                    <TextInput
                        placeholder="Enter Surname"
                        placeholderTextColor='grey'
                        borderWidth="2"
                        borderColor='#b39a0e'
                        width={212}

                    />
                </View>
            </View>

            <View style={{ marginTop: 3 }}>
                <TextInput
                    placeholder="Enter Email or Phone Number"
                    placeholderTextColor='grey'
                    borderWidth="2"
                    borderColor='#b39a0e'


                />
            </View>

            <View style={{ flexDirection: 'row', }}>
                <View style={{ marginTop: 3 }}>
                    <TextInput
                        placeholder="Enter Password"
                        placeholderTextColor='grey'
                        borderWidth="2"
                        borderColor='#b39a0e'
                        width={200}

                    />
                </View>

                <View style={{ marginTop: 3, marginLeft: 2 }}>
                    <TextInput
                        placeholder="Confirm Password"
                        placeholderTextColor='grey'
                        borderWidth="2"
                        borderColor='#b39a0e'
                        width={212} />
                </View>
            </View>

            <TouchableOpacity>
                <View style={styles.buttonContainer}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </View>
            </TouchableOpacity>

        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    bg: {
        // flex: 1,
        width: "100%",
        height: "100%",
    },
    buttonContainer: {
        backgroundColor: "#292828c5",
        padding: 15,
        borderRadius: 50,
        height: 50,
        width: 150,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginLeft: 140
    },
    buttonText: {
        color: '#b39a0e',
        fontSize: 16,
        fontWeight: 'bold',
    },
})