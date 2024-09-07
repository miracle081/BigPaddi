import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, FlatList, StatusBar } from 'react-native';
import { formatMoney } from '../Components/FormatMoney';
import { AppContext } from '../Components/GlobalVariables';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../Firebase/settings';

export function Cart() {
    const { userInfo, setPreloader, userUID } = useContext(AppContext)
    const [cart, setCart] = useState([]);
    const [fetchChanges, setfetchChanges] = useState(6687);
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            name: 'Florida T-Shirt',
            price: 620,
            image: 'https://img.freepik.com/free-photo/creased-t-shirt_23-2147704086.jpg?t=st=1723814609~exp=1723818209~hmac=546f903e17aa2f5f483a5a0237f36d6b971ca45844be3f467cfee3fa795611ed&w=900',
        },
        {
            id: 2,
            name: 'Nike Airforce',
            price: 1200,
            image: 'https://img.freepik.com/free-photo/pair-trainers_144627-3799.jpg?t=st=1723813876~exp=1723817476~hmac=efa45ec722f6c3338abb97838470410f7e010f6adf76c57c5dff78b2277c62c0&w=900',
        },
        {
            id: 3,
            name: 'Hoop Earrings',
            price: 80,
            image: 'https://img.freepik.com/premium-photo/fashion-women-s-earrings-gold-women-s-jewelery-gift_179493-477.jpg?w=740',
        },
    ]);

    const subtotal = cart.reduce((sum, item) => sum + Number(item.price), 0);
    const shipping = subtotal * 0.15;
    const total = subtotal + shipping;

    function getCartItem() {
        userInfo.cart.map((item) => {
            getDoc(doc(db, "products", item))
                .then(response => {
                    setCart(prev => [...prev, response.data()])
                    setfetchChanges(Math.random())
                })
                .catch(e => console.log(e))
        })
    }

    useEffect(() => {
        getCartItem();
        // console.log(cart);
    }, [])

    // useEffect(() => {
    //     setCart(cart);
    //     // console.log(cart);
    // }, [fetchChanges])


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.header}>
                <TouchableOpacity>
                    <Text style={styles.backArrow}>←</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Shopping Cart</Text>
                <TouchableOpacity>
                    <Text style={styles.cartIcon}>🛍️</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.itemsCountContainer}>
                <Text style={styles.itemsCount}>{userInfo.cart.length} Items</Text>
            </View>

            <FlatList
                data={cart}
                renderItem={({ item }) => (
                    <View style={styles.cartItem}>
                        <Image source={{ uri: item.image }} style={styles.itemImage} />
                        <Text style={styles.itemName}>{item.title}</Text>
                        <Text style={styles.itemPrice}>${formatMoney(item.price)}</Text>
                    </View>

                )}
                keyExtractor={(item) => item.createdAt.toString() + Math.random()}
                contentContainerStyle={styles.cartList}
            />

            <View style={styles.summaryContainer}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Subtotal</Text>
                    <Text style={styles.summaryText}>${subtotal}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryText}>Shipping</Text>
                    <Text style={styles.summaryText}>${shipping}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.totalText}>Total</Text>
                    <Text style={styles.totalText}>${total}</Text>
                </View>
            </View>

            <TouchableOpacity style={styles.checkoutButton}>
                <Text style={styles.checkoutButtonText}>Checkout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        alignItems: 'center',
    },
    backArrow: {
        fontSize: 24,
        color: 'black',
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#00000094',
    },
    cartIcon: {
        fontSize: 24,
    },
    itemsCountContainer: {
        backgroundColor: 'purple',
        paddingVertical: 8,
        alignItems: 'center',
    },
    itemsCount: {
        fontSize: 18,
        color: '#fff',
    },
    cartList: {
        padding: 16,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'purple',
        paddingVertical: 16,
    },
    itemDetails: {
        flex: 1,
        paddingLeft: 16,
        justifyContent: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 4,
    },

    itemImage: {
        width: 80,
        height: 80,
    },
    itemPrice: {
        fontSize: 18,
        color: 'black',
        alignContent: 'flex-end'
    },
    summaryContainer: {
        borderTopWidth: 1,
        borderTopColor: 'purple',
        padding: 16,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 8,
    },
    summaryText: {
        fontSize: 16,
        color: 'black',
    },
    totalText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    checkoutButton: {
        backgroundColor: 'purple',
        padding: 16,
        margin: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});