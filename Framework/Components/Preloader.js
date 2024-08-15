import { useContext } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, } from 'react-native';
import AnimatedLottieView from 'lottie-react-native';
import { AppContext } from '../../global/globalVariables';

export function Preloader() {
    const { preloader } = useContext(AppContext);
    return (
        <>
            {
                preloader ?
                    <View style={[StyleSheet.absoluteFillObject, styles.container]}>
                        <AnimatedLottieView
                            style={{ width: 400, height: 400 }}
                            source={require('../../assets/loader.json')}
                            autoPlay
                            loop
                            speed={1.5}

                        />
                    </View>
                    : null
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f9f4f4c4',
        zIndex: 2
    },
});

