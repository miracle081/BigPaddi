import { ScrollView, View, SafeAreaView, Image, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { AppBotton } from "../Components/AppBotton";
import { Theme } from "../Components/Theme";
import { LinearGradient } from 'expo-linear-gradient';
import GradientText from '../Components/GradientText';

export function Details({ navigation }) {
    const [Price, setPrice] = useState('#10,000');
    const [size, setSize] = useState('10');
    const [color, setColor] = useState('Black');
    const [name, setName] = useState('Jacket');


    const handleAddToCart = () => {
        alert(`${name} has been added to your cart!`);
    }

    return (


        <LinearGradient
            colors={['#ffffff', '#ffffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ flex: 1 }}
        >

            <SafeAreaView style={{ flex: 1 }}>
                <ScrollView style={{ flex: 1 }}>

                    <View style={{ padding: 15 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <GradientText colors={['#800080', '#4B0082']} style={{ fontSize: 30, width: 310 }}>
                                <Text style={{ color: 'white' }}> {name}</Text>


                            </GradientText>
                            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                                <View>
                                    <FontAwesomeIcon icon={faCartShopping} size={30} color="purple" />
                                </View></TouchableOpacity>
                        </View>
                        <Text style={{ fontFamily: Theme.fonts.text400, fontSize: 20, color: "black" }}>Elevate Your Style with Our Sleek Jacket</Text>
                    </View>


                    <View style={{ height: 300 }}>
                        <ScrollView horizontal>
                            <Image source={{ uri: "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724749207/img13_onqewq.jpg" }} style={{ width: 300, height: 300, marginRight: 10, borderRadius: 10 }} />
                            <Image source={{ uri: "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724749207/img13_onqewq.jpg" }} style={{ width: 300, height: 300, marginRight: 10, borderRadius: 10 }} />
                            <Image source={{ uri: "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724749207/img13_onqewq.jpg" }} style={{ width: 300, height: 300, marginRight: 10, borderRadius: 10 }} />
                        </ScrollView>
                    </View>


                    <View style={{ padding: 10 }}>
                        <View style={{ borderRadius: 5, margin: 1 }}>
                            <GradientText colors={['#ffffff', '#ffffff']}>
                                <Text style={{ color: 'black' }}> Discover the perfect blend of sophistication and versatility with our sleek black jacket. Crafted from premium, durable fabric, this jacket promises to be a timeless addition to your wardrobe.
                                </Text></GradientText>
                        </View>

                        <View style={{ marginTop: 20 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <Text style={{ fontSize: 25 }}>Price:</Text>
                                <Text style={{ fontSize: 25, fontFamily: Theme.fonts.text900, color: Theme.colors.primary }}>{Price}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ fontSize: 20 }}>Color:</Text>
                                <Text style={{ fontSize: 20, fontFamily: Theme.fonts.text900 }}>{color}</Text>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                                <Text style={{ fontSize: 20 }}>Size:</Text>
                                <Text style={{ fontSize: 20, fontFamily: Theme.fonts.text900 }}>{size}</Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>


                <TouchableOpacity onPress={handleAddToCart} style={{ borderRadius: 20 }}>
                    <LinearGradient
                        colors={['#800080', '#4B0082', "blue"]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={{ padding: 20, alignItems: 'center', borderRadius: 20 }}
                    >
                        <Text style={{ color: '#fff', fontSize: 20 }}>Add to Cart</Text>
                    </LinearGradient>
                </TouchableOpacity>
            </SafeAreaView></LinearGradient>
    );
}
