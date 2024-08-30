import { View, Text, Alert, ToastAndroid } from "react-native";
import { Paystack } from 'react-native-paystack-webview';
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore';
import { useContext } from "react";
import { Theme } from "../Components/Theme";
import { PAYSTACK_PUBLIC_KEY } from "../Firebase/APIkeys.key";
import { db } from "../Firebase/settings";
import { AppContext } from "../Components/GlobalVariables";

export function Pay({ navigation, route }) {
    const { userUID, setPreloader, userInfo } = useContext(AppContext);
    const { amount } = route.params
    return (
        <View style={{ flex: 1 }}>
            <Paystack
                paystackKey={PAYSTACK_PUBLIC_KEY}
                amount={amount + ((1.8 / 100) * amount)}
                billingEmail={userInfo.email}
                activityIndicatorColor={Theme.colors.green}
                onCancel={() => {
                    navigation.goBack()
                }}
                onSuccess={() => {
                    updateDoc(doc(db, "users", userUID), {
                        balance: amount + Number(userInfo.balance)
                    }).then(() => {
                        Alert.alert(
                            "Payment successful",
                            `Payment of ${amount} was successful`,
                            [{ text: "Ok", onPress: () => navigation.goBack() }]
                        )
                    }).catch(() => {
                        Alert.alert(
                            "Payment Status",
                            `Something went wrong.`,
                            [{ text: "Try Again", onPress: () => navigation.goBack() }]
                        )
                    })
                }}
                autoStart={true}
            />
        </View>
    )
}