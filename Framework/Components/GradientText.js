// components/GradientText.js
import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const GradientText = ({ children, colors, style }) => (
    <View style={{ borderRadius: 7 }}>
        <LinearGradient
            colors={colors}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ padding: 2, borderRadius: 10, overflow: 'hidden' }}
        >
            <Text style={[{ fontSize: 25, fontFamily: 'theme.fonts.text900' }, style]}> {children} </Text>
        </LinearGradient>
    </View>
);


export default GradientText;