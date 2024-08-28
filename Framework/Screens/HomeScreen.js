import {
    View,
    Text,
    FlatList,
    SafeAreaView,
    Dimensions,
    Image,
    Pressable,
    StatusBar,
    StyleSheet,
    ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Theme } from "../Components/Theme";
const { height, width } = Dimensions.get("window");


function format(price) {
    const nigerianCurrencyFormat = new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: "NGN",
    });

    return nigerianCurrencyFormat.format(price);
}

const collections = [
    "All",
    "New Arrivals",
    "Best Sellers",
    "Summer Collection",
    "Winter Sale",
    "Athleisure Wear",
    "Formal Attire",
    "Casual Comfort",
    "Accessories",
    "Workout Gear",
    "Vintage Classics",
    "Travel Essentials",
    "Kids Collection",
];
const allCategories = [
    {
        image:
            "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724750719/cloths_fxbfsh.png",
        name: "Cloths",
    },
    {
        image:
            "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724750718/bags_yjpihw.png",
        name: "bags",
    },
    {
        image:
            "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724750719/furniture_jmhhfo.png",
        name: "furniture",
    },
    {
        image:
            "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724750719/shoe_ufod7j.png",
        name: "shoe",
    },
    {
        image:
            "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724750719/electronics_w5lq6o.png",
        name: "electronics",
    },
    {
        image:
            "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724750719/cloths_fxbfsh.png",
        name: "Cloths",
    },
];

const images = [
    {
        uri: "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724749207/img13_onqewq.jpg",
    },
    { uri: "https://res.cloudinary.com/dtc67mcd9/image/upload/img6_zfaqp6.jpg" },
    {
        uri: "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724749205/img5_yti6c5.jpg",
    },
    {
        uri: "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724749202/img3_casuuh.jpg",
    },
    {
        uri: "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724749202/img2_auxhqr.jpg",
    },
    {
        uri: "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724748994/samples/ecommerce/analog-classic.jpg",
    },
];

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState(0);

    const getData = async () => {
        try {
            setLoading(true);
            const res = await fetch("https://fakestoreapi.com/products");
            if (res.ok) {
                const data = await res.json();
                setProducts(data);
            } else {
                console.error("Error fetching products. Status:", res.status);
            }
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <SafeAreaView style={{ backgroundColor: "#F6F6F6" }}>
            <View style={{ paddingBottom: 4 }}>
                <SafeAreaView
                    style={{ marginTop: StatusBar.currentHeight + 7, marginBottom: 20 }}
                >
                    <View
                        style={{
                            paddingHorizontal: 8,
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <View
                            style={{ flexDirection: "row", gap: 2, alignItems: "center" }}
                        >
                            <Image
                                source={require("../../assets/logos/Designer3.png")}
                                style={{ width: 26, height: 26 }}
                            />
                            <Text
                                style={{
                                    fontSize: 18,
                                    fontWeight: 800,
                                    textTransform: "uppercase",
                                    letterSpacing: -0.3,
                                }}
                            >
                                BigPaddi
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", gap: 12, marginRight: 9 }}>
                            <Pressable
                                onPress={() => console.log("navigate to cart")}
                                style={{ position: "relative" }}
                            >
                                <Text
                                    style={{
                                        backgroundColor: "red",
                                        width: 10,
                                        height: 10,
                                        top: -0,
                                        zIndex: 10,
                                        borderRadius: 50,
                                        right: -3,
                                        fontSize: 12,
                                        position: "absolute",
                                        lineHeight: 12,
                                        padding: 3,
                                        color: "white",
                                    }}
                                ></Text>
                                <Ionicons name="cart-outline" size={24} color="black" />
                            </Pressable>
                            <Pressable
                                onPress={() => console.log("open side drawer (thats our menu)")}
                            >
                                <Ionicons name="menu" size={24} color="black" />
                            </Pressable>
                        </View>
                    </View>
                </SafeAreaView>
                <View>
                    <FlatList
                        data={collections}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <Pressable onPress={() => setSelected(index)}>
                                <View
                                    style={
                                        index == selected
                                            ? {
                                                backgroundColor: Theme.colors.primary,
                                                marginRight: 10,
                                                borderRadius: 6,
                                                padding: 7,
                                                paddingHorizontal: 14,
                                                marginLeft: index == 0 ? 5 : 0,
                                                borderWidth: 1,
                                            }
                                            : {
                                                marginLeft: index == 0 ? 5 : 0,
                                                marginRight: 10,
                                                borderRadius: 6,
                                                borderColor: "black",
                                                padding: 7,
                                                borderWidth: 1,
                                            }
                                    }
                                >
                                    <Text
                                        style={
                                            index == selected
                                                ? { color: "white", fontSize: 12.5 }
                                                : { fontSize: 12.5 }
                                        }
                                    >
                                        {item}
                                    </Text>
                                </View>
                            </Pressable>
                        )}
                    />
                </View>
            </View>
            <ScrollView>
                <View id="manual slider" style={{ height: 241, position: "relative" }}>
                    <View>
                        <Carousel
                            loop
                            width={width}
                            style={{ height: 251 }}
                            autoPlay={true}
                            data={images}
                            scrollAnimationDuration={2800}
                            renderItem={({ item }) => {
                                return (
                                    <View>
                                        <Image
                                            source={item}
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                                objectFit: "contain",
                                            }}
                                        />
                                    </View>
                                );
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        padding: 8,
                        gap: 12,
                        marginBottom: 10,
                    }}
                >
                    <Text style={{ fontSize: 16 }}>Discover</Text>
                    <View>
                        <FlatList
                            data={allCategories}
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }) => (
                                <Pressable>
                                    <View
                                        style={{ marginRight: 10, alignItems: "center", gap: 4 }}
                                    >
                                        <Image
                                            source={{ uri: item.image }}
                                            style={{ width: 65, height: 65, borderRadius: 50 }}
                                        />
                                        <Text
                                            style={{ fontSize: 12.5, textTransform: "capitalize" }}
                                        >
                                            {item.name}
                                        </Text>
                                    </View>
                                </Pressable>
                            )}
                        />
                    </View>
                </View>
                <View style={{ marginBottom: 10 }}>
                    <View
                        style={{
                            backgroundColor: "white",
                            padding: 8,
                            borderRadius: 30,
                            paddingVertical: 20,
                            minHeight: 400,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingRight: 4,
                                alignItems: "center",
                            }}
                        >
                            <View>
                                <Text style={{ fontSize: 17, fontWeight: 500 }}>
                                    Newly Arrived
                                </Text>
                                <Text style={{ fontSize: 10 }}>
                                    Take a look from a variety of brands and companies
                                </Text>
                            </View>
                            <Pressable onPress={() => console.log("clicked seemore")}>
                                <Text style={{ fontSize: 10, color: Theme.colors.primary }}>
                                    SEE MORE
                                </Text>
                            </Pressable>
                        </View>
                        <View>
                            <View style={styles.container}>
                                {loading ? (
                                    <Text> Loading...</Text>
                                ) : products && products?.length > 0 ? (
                                    products.map((item, index) => (
                                        <View key={index}>
                                            <Image
                                                source={{ uri: item.image }}
                                                style={{ width: 120, height: 120, borderRadius: 10 }}
                                            />
                                            <Text
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                                style={{ maxWidth: 150 }}
                                            >
                                                {item.title}
                                            </Text>
                                            <Text style={{ fontWeight: 600, fontSize: 16 }}>
                                                {format(item.price * 30)}
                                            </Text>
                                            <Text
                                                style={{ fontWeight: 400, fontSize: 12, color: "gray", textTransform: "capitalize" }}
                                            >
                                                {item.category}
                                            </Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text>Refresh</Text>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        marginBottom: 10,
                        height: 150,
                        alignItems: "center",
                        flexDirection: "row",
                        gap: 4,
                    }}
                >
                    <Image
                        style={{ width: "50%", height: "100%", objectFit: "contain" }}
                        source={{
                            uri: "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724749205/img14_v64e0h.jpg",
                        }}
                    />
                    <Image
                        style={{ width: "50%", height: "100%", objectFit: "contain" }}
                        source={{
                            uri: "https://res.cloudinary.com/dtc67mcd9/image/upload/v1724749201/img1_firu4h.jpg",
                        }}
                    />
                </View>
                <View style={{ marginBottom: 100 }}>
                    <View
                        style={{
                            backgroundColor: "white",

                            borderRadius: 30,
                            paddingVertical: 20,
                            minHeight: 400,
                        }}
                    >
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                padding: 8,
                                paddingRight: 12,
                                alignItems: "center",
                                backgroundColor: "#043f5f",
                            }}
                        >
                            <View style={{}}>
                                <Text style={{ fontSize: 17, color: "white", fontWeight: 500 }}>
                                    Summer Collection
                                </Text>
                                <Text style={{ fontSize: 10, color: "white" }}>
                                    Take a look from a variety of brands and companies
                                </Text>
                            </View>
                            <Pressable onPress={() => console.log("clicked seemore")}>
                                <Text style={{ fontSize: 10, color: "white" }}>SEE MORE</Text>
                            </Pressable>
                        </View>
                        <View>
                            <View style={styles.container}>
                                {loading ? (
                                    <Text> Loading...</Text>
                                ) : products && products?.length > 0 ? (
                                    products.map((item, index) => (
                                        <View key={index}>
                                            <Image
                                                source={{ uri: item.image }}
                                                style={{ width: 120, height: 120, borderRadius: 10 }}
                                            />
                                            <Text
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                                style={{ maxWidth: 150 }}
                                            >
                                                {item.title}
                                            </Text>
                                            <Text style={{ fontWeight: 600, fontSize: 16 }}>
                                                {format(item.price * 30)}
                                            </Text>
                                            <Text
                                                style={{ fontWeight: 400, fontSize: 12, color: "gray", textTransform: "capitalize" }}
                                            >
                                                {item.category}
                                            </Text>
                                        </View>
                                    ))
                                ) : (
                                    <Text>Refresh</Text>
                                )}
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        rowGap: 20,
        justifyContent: "space-between",
        padding: 16,
    },
    item: {
        width: "49%",
        marginVertical: 7,
        padding: 16,
        backgroundColor: "#f6f6f6",
    },
});