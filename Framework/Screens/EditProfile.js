import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Text, View, TextInput, Alert, TouchableOpacity, Image, Pressable, ScrollView, StyleSheet, Dimensions, } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faCameraRetro, faImage, faXmark } from '@fortawesome/free-solid-svg-icons';
import { Modal } from 'react-native';
import { } from 'react-native';
import { doc, updateDoc, } from 'firebase/firestore';
import { Theme } from '../Components/Theme';
import { db, imgStorage, storage } from '../Firebase/settings';
import * as Imagepicker from "expo-image-picker"
import { getDownloadURL, ref } from 'firebase/storage';
import { AppContext } from '../Components/GlobalVariables';


export function EditProfile({ navigation }) {
    const { userUID, setPreloader, userInfo } = useContext(AppContext);
    const [image, setImage] = useState(null);
    const [modalVisibility, setModalVisibility] = useState(false);
    const [preVisibility, setpreVisibility] = useState(false);
    const [imageMD, setimageMD] = useState(false);
    const [firstname, setFirstname] = useState(userInfo.firstname);
    const [lastname, setLastname] = useState(userInfo.lastname);
    const [address, setaddress] = useState(userInfo.address);
    const [phone, setphone] = useState(userInfo.phone);
    const width = Dimensions.get("screen").width



    useEffect(() => {
        // setPreloader(false)
    }, []);

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };
    const previewModal = () => {
        setpreVisibility(!preVisibility);
    };

    const imageModal = () => {
        setimageMD(!imageMD);
    };


    async function picker() {
        const result = await Imagepicker.launchImageLibraryAsync({
            mediaType: Imagepicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 4],
            quality: 1,
        })
        console.log(JSON.stringify(result, null, 2));
        if (!result.canceled) {
            const { uri } = result.assets[0];
            setImage(uri)
            previewModal();
        }
    }

    async function fetchProfilePic() {
        setPreloader(true)
        const reference = ref(storage, `ProfileImages/${userUID}`);
        await getDownloadURL(reference).then(userImg => {
            updateDoc(doc(db, "users", userUID), {
                image: userImg
            }).then(() => {
                Alert.alert(
                    "Profile Image uploaded",
                    "Your profile picture has been uploaded successfully!",
                );
                setPreloader(false)
            })
                .catch(() => {
                    Alert.alert(
                        "Upload Status",
                        "Failed to update profile image. Please try again",
                    )
                    setPreloader(false);
                })
        }).catch(() => {
            setPreloader(false);
        })
    }

    async function uplaodToStorage() {
        try {
            let response = await fetch(image);
            // console.log(response);
            const imageBlob = await response.blob()
            await imgStorage().ref().child(`ProfileImages/${userUID}`).put(imageBlob);
        } catch {
            setPreloader(false)
            Alert.alert(
                "Upload Status",
                "Failed to upload profile image. Please try again",
                [{ text: 'OK' }]
            )
        }
    }

    function handleUpload() {
        setPreloader(true)
        uplaodToStorage().then(() => {
            fetchProfilePic()
        })
    }

    function editProfile() {
        setPreloader(true)
        updateDoc(doc(db, "users", userUID), {
            firstname,
            lastname,
            phone,
            address,

        }).then(() => {
            setPreloader(false)
            Alert.alert(
                "Edit Profile",
                "Profile has been edited successfully",
            )
        }).catch((error) => {
            // console.log(typeof error.code)
            setPreloader(false)
            Alert.alert(
                "Message!",
                errorMessage(error.code),
                [{ text: "Try Again" }]
            )
        })
    }


    return (
        <View style={styles.container}>
            <View style={styles.body}>
                {/* <ScrollView > */}
                <View style={styles.header}>
                    <View style={{ position: "relative" }}>
                        <Pressable onPress={imageModal}>
                            <Image source={{ uri: userInfo.image }}
                                defaultSource={require("../../assets/user.png")}
                                style={styles.ProfileImage} />
                        </Pressable>
                        <TouchableOpacity onPress={closeModal} style={styles.BtnIcon}>
                            <FontAwesomeIcon icon={faCameraRetro} color="#16171D" size={15} />
                        </TouchableOpacity>
                    </View>
                </View>

                <ScrollView>

                    <View style={styles.formContainer}>
                        <Text style={styles.signupText}>First Name</Text>
                        <TextInput
                            style={styles.inputStyle}
                            keyboardType='default'
                            placeholder='Last name'
                            autoCapitalize='words'
                            mode='outlined'
                            onChangeText={(text) => setFirstname(text.trim())}
                            value={firstname}
                        />

                        <Text style={styles.signupText}>Last Name</Text>
                        <TextInput
                            style={styles.inputStyle}
                            keyboardType='default'
                            placeholder='Last name'
                            mode='outlined'
                            autoCapitalize='words'
                            onChangeText={(text) => setLastname(text.trim())}
                            value={lastname}
                        />

                        <Text style={styles.signupText}>Email</Text>
                        <TextInput
                            style={styles.inputStyle}
                            placeholder='Email'
                            mode='outlined'
                            autoCapitalize='none'
                            value={userInfo.email}
                            editable={false}
                        />

                        <Text style={styles.signupText}>Phone Number</Text>
                        <TextInput
                            style={styles.inputStyle}
                            keyboardType='number-pad'
                            placeholder='Phone'
                            mode='outlined'
                            onChangeText={(text) => setphone(text)}
                            value={phone}
                        />

                        <Text style={styles.signupText}>Address</Text>
                        <TextInput
                            style={styles.inputStyle}
                            keyboardType='default'
                            placeholder='Address'
                            mode='outlined'
                            onChangeText={(text) => setaddress(text)}
                            value={userInfo.address}
                        />
                        <TouchableOpacity onPress={editProfile}
                            style={[styles.getStarted, { marginHorizontal: 10 }]}>
                            <Text style={{ fontFamily: Theme.fonts.text600, fontSize: 16, color: "white" }}>Update Profile</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>


            {/* <=======================> Image Methods <=======================> */}
            <Modal
                visible={modalVisibility}
                animationType="slide"
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <Pressable style={{ flex: 1 }} onPress={closeModal} >
                    </Pressable>
                    <View style={{ backgroundColor: "#16171D", height: 170, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                        <View style={{ alignItems: 'flex-end', margin: 10 }}>
                            <TouchableOpacity onPress={closeModal}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size={24}
                                    color={Theme.colors.primary}
                                />
                            </TouchableOpacity>
                        </View>
                        <View>

                            <TouchableOpacity onPress={() => {
                                closeModal(); picker()
                            }}>
                                <View style={{ margin: 10, marginTop: 0, padding: 5, flexDirection: "row", }}>
                                    <FontAwesomeIcon
                                        icon={faImage}
                                        color={Theme.colors.primary}
                                        size={25}
                                    />
                                    <Text style={{ fontSize: 15, paddingLeft: 5, color: "white" }}>Gallery</Text>
                                </View>
                            </TouchableOpacity>
                            <View
                                style={{
                                    borderBottomColor: Theme.colors.primary,
                                    borderBottomWidth: StyleSheet.hairlineWidth,
                                    margin: 10, marginTop: 0
                                }}
                            />
                            <TouchableOpacity onPress={() => {
                                closeModal()
                            }}>
                                <View style={{ margin: 10, marginTop: 0, padding: 5, flexDirection: "row" }}>
                                    <FontAwesomeIcon
                                        icon={faCameraRetro}
                                        color={Theme.colors.primary}
                                        size={25}
                                    />
                                    <Text style={{ fontSize: 15, paddingLeft: 5, color: "white" }}>
                                        Camera
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>
            </Modal>

            {/* <====================> Preview Image before Uploading <====================> */}
            <Modal
                visible={preVisibility}
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.5)" }}>
                    <Pressable style={{ flex: 1 }} onPress={previewModal} >
                    </Pressable>
                    <View style={{ backgroundColor: '#16171D', height: 500, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                        <View style={{ alignItems: 'flex-end', margin: 10 }}>
                            <TouchableOpacity onPress={previewModal}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size={24}
                                    color='grey'
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={{ alignItems: 'center', padding: 5, justifyContent: 'center' }}>
                            <Image source={{ uri: image }} style={{ width: 300, height: 300, borderRadius: 400, }} />
                        </View>
                        <TouchableOpacity onPress={() => { previewModal(); handleUpload() }}
                            style={[styles.getStarted, { marginHorizontal: 10 }]}>
                            <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16, }}>Upload Image</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* ============================> Profile Modal <============================ */}
            <Modal
                visible={imageMD}
                animationType="slide"
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "#16171df4" }}>
                    <Pressable style={{ flex: 1 }} onPress={imageModal} >
                    </Pressable>
                    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                        <Image source={require('../../assets/user.png')}
                            style={{ width: width - 5, height: width - 5 }}
                        />
                    </View>
                    <Pressable style={{ flex: 1 }} onPress={imageModal} >
                    </Pressable>
                </View>
            </Modal>
        </View >
    )
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfbff',

    },
    body: {
        flex: 1,
        marginHorizontal: 10,
    },
    header: {
        position: "relative",
        alignItems: 'center',
        marginBottom: 15,
        marginTop: 15,
        backgroundColor: '#d4cef1',
        padding: 10,
        borderRadius: 8
    },
    BtnIcon: {
        backgroundColor: Theme.colors.primary,
        padding: 5,
        borderRadius: 60,
        position: "absolute",
        bottom: 0,
        right: 10,
        zIndex: 11,
    },
    ProfileImage: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 80,
    },
    text1: {
        color: '#787A8D',
        marginTop: 10,
        fontSize: 23,
        fontWeight: 'bold'
    },
    formContainer: {
        padding: 10,
        marginTop: 10
    },
    inputStyle: {
        borderColor: "gray",
        borderWidth: 1,
        padding: 15,
        marginBottom: 10,
        borderRadius: 10,
        width: "100%",
        fontSize: 18
    },
    getStarted: {
        backgroundColor: Theme.colors.primary,
        padding: 13,
        marginTop: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,

    },
    signupText: {
        color: '#434355',
        marginBottom: 5,
        fontSize: 15
    },
    calenderIcon: {
        backgroundColor: Theme.colors.primary,
        position: "absolute",
        padding: 8,
        top: 4,
        right: 4,
        borderRadius: 90
    },
    login: {
        flexDirection: 'row',
    },
    terms: {
        flexDirection: 'row',
        marginBottom: 10,
        alignItems: 'center',
    },
    errorMessage: {
        color: 'red'
    },
    textBelow: {
        // flexDirection:'row',
        // justifyContent:'space-between'
        alignItems: 'center'
    }
})