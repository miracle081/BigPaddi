import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Theme } from './Theme';

export function AppBotton({ disabled, textStyle, onPress, children, style, textColor, buttonColor }) {

    const styles = StyleSheet.create({
        btn: {
            // flex: 1,
            borderRadius: 30,
            backgroundColor: buttonColor || Theme.colors.primary,
            padding: 10,
        },
    });
    return (
        <TouchableOpacity disabled={disabled} activeOpacity={0.7} onPress={onPress} style={[styles.btn, style]}>
            <Text style={[{ color: textColor || "white", textAlign: "center", fontSize: 17, fontFamily: Theme.fonts.text700 }, textStyle]}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}

