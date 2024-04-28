import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Alert, StyleSheet, ScrollView, ImageBackground } from "react-native";
import logo from '../Images/Logo.png';
import imagen from '../Images/imagen1.jpg';
import ForgotPassword from "./ForgotPassword";
import Signup from "./Signup";
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const apiIp = config.apiIp;

    const handleLogin = () => {
        if (email === "admin" && password === "admin") {
            navigation.navigate('Panel Administrador');
        }
        else if (email === "1" && password === "1") {
            navigation.navigate('Panel Doctor');

        }
        else if (password !== "" && email !== "") {
            const data = {
                correo: email,
                password: password
            };

            fetch(`${apiIp}:5000/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        const dataUser = data.user;
                        // Almacenar datos del usuario en AsyncStorage
                        AsyncStorage.setItem('userData', JSON.stringify(dataUser));
                        Alert.alert(
                            'Login validation',
                            `Welcome: ${dataUser.username}`,
                            [
                                {
                                    text: 'OK',
                                    onPress: () => {
                                        setEmail("");
                                        setPassword("");
                                        if (dataUser.rol === 0) {
                                            // Alert.alert('Login', 'Ir a la pantalla admin');
                                            navigation.navigate('Panel Administrador');
                                        } else if (dataUser.rol === 1) {
                                            // Alert.alert('Login', 'Ir a la pantalla doctor');
                                            navigation.navigate('Panel Doctor');
                                        } else if (dataUser.rol === 2) {
                                            navigation.navigate('Home Paciente');
                                        }
                                    }
                                }
                            ]
                        );
                    } else {
                        Alert.alert('Login', 'Email and/or password incorrect.');
                    }
                })
                .catch(error => {
                    // Si ocurre algún error en la solicitud, puedes manejarlo aquí
                    console.error('Error:', error);
                    Alert.alert('Login', 'An error occurred. Please try again later.');
                });
        } else {
            // Si los campos de correo y contraseña están vacíos, muestra un mensaje de alerta
            Alert.alert('Login', 'Please fill out the fields.');
        }
    };

    const handleForgotPassword = () => {
        navigation.navigate('ForgotPassword');
    };

    const handleSignUp = () => {
        navigation.navigate('SignUp');
    };


    return (
        <ImageBackground
            source={require("../Images/Login.jpg")}
            style={styles.backgroundImage}
        >
            <ScrollView contentContainerStyle={styles.scrollViewContainer}>
                <View style={styles.container}>
                    <View style={styles.formContainer}>
                        <Image source={logo} style={[styles.logo, { opacity: 0.7 }]} />
                        {

                            <View style={styles.form}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Email"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                                <TextInput
                                    style={styles.input}
                                    placeholder="Password"
                                    secureTextEntry
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity onPress={handleLogin} style={styles.button}>
                                    <Text style={styles.buttonText}>Sign in</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
                                    <Text style={styles.forgotPasswordText}>Forgot password?</Text>
                                </TouchableOpacity >
                                <TouchableOpacity onPress={handleSignUp}>
                                    <Text style={styles.signUpText}>Don't have an account? <Text style={styles.signUpLink}>Sign up here</Text>.</Text>
                                </TouchableOpacity>

                            </View>

                        }
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>

    );
};

const styles = StyleSheet.create({
    scrollViewContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: "rgba(255, 255, 255, 0.3)",
    },
    imageContainer: {
        flex: 1,
    },
    image: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    formContainer: {
        flex: 2,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    logo: {
        width: 400,
        height: 400,
        marginBottom: 20,
    },
    form: {
        width: '100%',
        alignItems: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        height: 40, // Altura ajustada
        width: '80%', // Ancho ajustado
        backgroundColor: "rgba(255, 255, 255, 0.7)"
    },
    button: {
        backgroundColor: 'blue',
        padding: 15,
        alignItems: 'center',
        justifyContent: "center",
        borderRadius: 5,
        marginBottom: 10,
        height: 50,
        width: '70%', // Ancho ajustado
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    forgotPassword: {
        alignItems: 'center',
        marginBottom: 10,
        height: 20
    },
    forgotPasswordText: {
        color: 'blue',
    },
    signUpText: {
        fontSize: 12,
    },
    signUpLink: {
        color: 'blue',
        fontWeight: 'bold',
    },backgroundImage: {
        flex: 1,
        resizeMode: "cover", // O ajusta según tu preferencia
        justifyContent: "center"
    }
});

export default Login;