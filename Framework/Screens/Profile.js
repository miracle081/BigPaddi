import { View, StyleSheet, Text, SafeAreaView, Platform, StatusBar, TouchableOpacity, Image, Modal, Pressable } from "react-native";
import { Avatar } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { Theme } from "../Components/Theme";
import { useContext, useState } from "react";
import { formatMoney } from "../Components/FormatMoney";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPlusCircle, faUserCircle, faXmark } from "@fortawesome/free-solid-svg-icons";
import * as Imagepicker from "expo-image-picker"
import { AppContext } from "../Components/GlobalVariables";

export function Profile({ navigation }) {
    const { userInfo, setUserInfo, setUserUID, setPreloader, userUID } = useContext(AppContext);
    const [modalVisibility, setModalVisibility] = useState(false);

    const closeModal = () => {
        setModalVisibility(!modalVisibility);
    };

    async function logout() {
        setPreloader(true)
        setTimeout(() => {
            setPreloader(false)
            setUserInfo({ balance: 0 });
            setUserUID("")
            navigation.replace('Intro')
        }, 2000);
    }


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", borderColor: Theme.colors.primary, borderBottomWidth: 2, borderRadius: 20 }}>
                    <View style={{}}>
                        <Image style={{ width: 80, height: 80, borderRadius: 50 }} source={{ uri: userInfo.image }}
                            defaultSource={require("../../assets/user.png")} />
                        <View style={{ marginBottom: 10, }}>
                            <Text style={{ fontSize: 30, fontFamily: Theme.fonts.text500 }}>{userInfo.firstname} {userInfo.lastname}</Text>
                            <Text style={{ fontSize: 15, fontFamily: Theme.fonts.text500 }}>{userInfo.email}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}
                                style={{ backgroundColor: Theme.colors.primary, padding: 10, borderRadius: 100, width: 140, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginVertical: 10 }}>
                                <FontAwesomeIcon icon={faUserCircle} color={Theme.colors.blueLight} />
                                <Text style={{ fontSize: 13, alignItems: 'center', fontFamily: Theme.fonts.text600, marginLeft: 5, color: Theme.colors.blueLight }}>Edit Profile</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={{ fontSize: 15, fontFamily: Theme.fonts.text500, textAlign: "center" }}>Balance</Text>
                        <Text style={{ fontSize: 14, }}>$<Text style={{ fontSize: 20 }}>{formatMoney(userInfo.wallet || 0)}</Text></Text>
                        <TouchableOpacity onPress={() => navigation.navigate("FundAccount")}
                            style={{ borderColor: Theme.colors.primary, borderWidth: 1, padding: 5, borderRadius: 100, width: 100, height: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <FontAwesomeIcon icon={faPlusCircle} color={Theme.colors.primary} />
                            <Text style={{ fontSize: 13, alignItems: 'center', fontWeight: 'bold', marginLeft: 5, color: Theme.colors.primary }}>Fund</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flex: 1, marginTop: 10, paddingTop: 20, }}>
                    <TouchableOpacity onPress={() => navigation.navigate("MyProducts")} style={styles.ProfileBtn}>
                        <FontAwesome5 name="list-alt" size={30} style={{ paddingRight: 10, color: Theme.colors.primary }} />
                        <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16 }}>My Products</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("AppliedJobs")} style={styles.ProfileBtn}>
                        <MaterialCommunityIcons name='briefcase-check' size={30} style={{ paddingRight: 10, color: Theme.colors.primary }} />
                        <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16 }}>Applied Jobs</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("ChangePassword")} style={styles.ProfileBtn}>
                        <FontAwesome5 name='lock' size={30} style={{ paddingRight: 10, color: Theme.colors.primary }} />
                        <Text style={{ fontFamily: Theme.fonts.text500, fontSize: 16 }}>Change password</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={closeModal} style={[styles.ProfileBtn, { backgroundColor: "#cd0000af" }]}>
                    <SimpleLineIcons name='logout' size={25} style={{ paddingRight: 10, color: "white" }} col />
                    <Text style={{ fontFamily: Theme.fonts.text700, fontSize: 16, color: "#fffcfc" }}>Logout</Text>
                </TouchableOpacity>
            </View>
            {/* logout  modal  */}

            <Modal
                visible={modalVisibility}
                animationType="slide"
                transparent={true}
            >
                <View style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.8)" }}>
                    <Pressable style={{ flex: 1 }} onPress={closeModal} >
                    </Pressable>
                    <View style={{ height: 200, backgroundColor: "#fcfbff", borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                        <View style={{ alignItems: 'flex-end', margin: 10 }}>
                            <TouchableOpacity onPress={closeModal}>
                                <FontAwesomeIcon
                                    icon={faXmark}
                                    size={24}
                                    color='#787A8D'
                                />
                            </TouchableOpacity>
                        </View>
                        <View>

                            <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                <Text>Are you sure you want to log out</Text>
                            </View>
                            <View style={{
                                alignItems: 'center', marginTop: 20, margin: 15, padding: 0,
                                borderRadius: 8
                            }}>
                                <TouchableOpacity onPress={() => { closeModal(); logout() }} style={{
                                    backgroundColor: '#de4040', width: '100%', alignItems: 'center', padding: 10, borderRadius: 8
                                }}>
                                    <Text style={{ color: 'white', fontWeight: 'bold' }}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: Platform.OS == 'android' ? StatusBar.currentHeight : null,
        // alignItems: 'center',
        padding: 20,
    },
    EditProfileBtn: {
        borderWidth: 1,
        paddingHorizontal: 20,
        padding: 10,
        borderRadius: 10,
        marginBottom: 20,
        marginTop: 10,
        // flex: 1,
        backgroundColor: Theme.colors.primary
    },
    ProfileBtn: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#0000000f",
        borderRadius: 10,
        marginBottom: 10
    },
})