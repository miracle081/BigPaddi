import { Alert } from "react-native"

export function errorHandler(array) {
    // const texts = array.map(e => e.attr + ": " + e.detail).join("\n")
    const texts = array.map(e => e.detail).join("\n")
    Alert.alert("Error occurred!", texts)
}