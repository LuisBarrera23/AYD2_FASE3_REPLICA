import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Products() {
    const [products, setProducts] = useState([]);
    const apiIp = config.apiIp;

    useEffect(() => {
        AsyncStorage.getItem('userData')
            .then(userData => {
                if (userData) {
                    const dataUser = JSON.parse(userData);
                    fetch(`${apiIp}:5000/products/${dataUser.id_user}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((response) => response.json())
                        .then((res) => {
                            // console.log(res);
                            setProducts(res?.products);
                        })
                        .catch((error) => console.error(error));
                }
            })
            .catch(error => {
                console.error('Error al recuperar datos del usuario:', error);
            });
    }, []);

    const handleAddProduct = (product) => {
        Alert.alert('Productos', `Se desea agregar el producto con ID: ${product}`);
    };

    return (
        <View style={{ flex: 1, paddingBottom: '5%' }}>
            <Text style={styles.text}>Our products:</Text>
            <ScrollView contentContainerStyle={styles.container}>
                {products.map((product) => (
                    <View style={styles.col} key={product.id_product}>
                        <View style={styles.profileCard}>
                            <View style={styles.centeredContainer}>
                                <Image source={{ uri: product.image }} style={styles.userImage} />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text numberOfLines={1} style={styles.title}>{product.name}</Text>
                                <View style={styles.hr} />
                            </View>
                            <View style={styles.details}>
                                <Text numberOfLines={2} style={styles.description}>{product.description}</Text>
                                <Text style={styles.stock}>En stock: {product.stock}</Text>
                                <View style={{alignItems: 'center'}}>
                                    <TouchableOpacity style={styles.btn} onPress={() => handleAddProduct(product.id_product)}>
                                        <Text style={styles.btnText}>+</Text>
                                    </TouchableOpacity>
                                </View>
                                <Text style={styles.price}>Q. {product.price}</Text>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    text: {
        marginTop: '5%',
        marginLeft: '5%',
        marginBottom: '2rem',
        padding: '0',
        fontSize: 24,
        fontWeight: 'bold',
    },
    container: {
        alignItems: 'center',
        margin: '5%',
    },
    col: {
        width: '100%',
        marginBottom: '5%',
    },
    profileCard: {
        textAlign: 'left',
        backgroundColor: '#0d0c1b',
        borderRadius: 10,
        padding: 0,
    },
    centeredContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: 110,
    },
    userImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    inputContainer: {
        textAlign: 'center',
        color: 'black',
        maxHeight: '5vh',
        overflowX: 'auto',
        whiteSpace: 'nowrap',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        color: 'white',
        marginLeft: '3%',
    },
    hr: {
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        margin: 0,
    },
    details: {
        textAlign: 'center',
        color: 'black',
        fontSize: 12,
        marginTop: 10,
        color: 'white',
    },
    description: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'white',
        marginBottom: 5,
        color: 'white',
        marginLeft: '3%',
        marginRight: '3%',
    },
    stock: {
        width: '90%',
        margin: 0,
        textAlign: 'left',
        color: 'white',
        marginLeft: '3%',
    },
    price: {
        textAlign: 'center',
        marginTop: 5,
        fontWeight: 'bold',
        color: 'white',
    },
    btn: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        borderRadius: 5,
        backgroundColor:"#007bff"
    },
    btnText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default Products;
