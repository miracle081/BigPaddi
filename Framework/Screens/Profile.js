import { Modal, Pressable, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useState } from 'react'
import { AppBotton } from '../Components/AppBotton'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { Theme } from '../Components/Theme'

export function Profile() {
    const [visibility, setvisibility] = useState(false)

    return (
        <SafeAreaView style={{ backgroundColor: "white" }}>
            <View style={{ padding: 20, backgroundColor: "white" }}>
                <Text>Profile</Text>
                <AppBotton onPress={() => setvisibility(true)}>Open Modal</AppBotton>




                <Modal
                    visible={visibility}
                    animationType="slide"
                    transparent={true}
                >
                    <View style={{ flex: 1, backgroundColor: "rgba(0, 0, 0, 0.8)" }}>
                        <Pressable style={{ flex: 1, }} onPress={() => setvisibility(false)} ></Pressable>
                        <View style={{ height: 200, backgroundColor: Theme.colors.light.bg, borderTopRightRadius: 20, borderTopLeftRadius: 20 }}>
                            <View style={{ alignItems: 'flex-end', margin: 10 }}>
                                <TouchableOpacity onPress={() => setvisibility(false)}>
                                    <FontAwesomeIcon
                                        icon={faXmark}
                                        size={24}
                                        color={Theme.colors.light.text2}
                                    />
                                </TouchableOpacity>
                            </View>
                            <View>

                                <View style={{ alignItems: 'center', marginBottom: 10 }}>
                                    <Text style={{ fontSize: 16, fontFamily: Theme.fonts.text400 }}>Are you sure you want to log out?</Text>
                                </View>

                                <View style={{
                                    marginTop: 20, margin: 15,
                                }}>

                                    <AppBotton onPress={() => { setvisibility(false) }} style={{ borderColor: Theme.colors.red, backgroundColor: "transparent", borderWidth: 1 }} textColor={Theme.colors.red}>Yes, Sign Out</AppBotton>
                                </View>

                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({})