import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert  } from "react-native";
import config from '../../config';


const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const apiIp = config.apiIp;
    

    const handleResetPassword = () => {
        if (email !== "") {
            const data = {
                correo: email,
            };
    
            fetch(`${apiIp}:5000/forgotPassword`, { // Reemplaza YOUR_API_IP con la IP de tu servidor
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
            .then((response) => response.json())
            .then((res) => {
                if (res.message === "A verification code has been sent to your email") {
                    Alert.alert(res.message);
                    navigation.navigate("ForgotPasswordConfirm")
                    setEmail("")
                    
                } else {
                    Alert.alert("Error", res.message); // Muestra un mensaje de error en caso contrario
                }
            })
            .catch((error) => console.error(error));
        } else {
            Alert.alert("Error", "Please enter your email.");
            // navigation.navigate("ForgotPasswordConfirm")

        }
    };

    const handleForgotPassword = () => {
        navigation.navigate("Login")
    };




    return (
        <ImageBackground
            source={require("../Images/imagenForgot.jpg")}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <View style={styles.container2}>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter email"
                            value={email}
                            onChangeText={setEmail}
                        />
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={handleForgotPassword} style={styles.button}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleResetPassword} style={[styles.button, styles.resetButton]}>
                            <Text style={styles.buttonText2}>Reset password</Text>
                        </TouchableOpacity>
                    </View>
                </View>


            </View>
        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: "rgba(255, 255, 255, 0.3)", // Fondo semitransparente
    },container2: {
        flex: 1,
        justifyContent: 'center',
        width: "auto",
        maxHeight: 200,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Fondo semitransparente
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover", // O ajusta según tu preferencia
        justifyContent: "center"
    },
    inputContainer: {
        marginBottom: 20,
        backgroundColor: "rgba(255, 255, 255, 0.8)"
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#007BFF'
    },
    resetButton: {
        backgroundColor: '#007BFF',
    },
    buttonText: {
        fontSize: 16,
        color: '#007BFF',
    },
    buttonText2: {
        fontSize: 16,
        color: '#ffffff',
    },
    modalContainer: {
        backgroundColor: 'gray',
        padding: 20,
        borderRadius: 10,
        justifyContent: "center"
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    submitButton: {
        backgroundColor: '#007BFF',
        marginTop: 10,
    },
    cancelButton: {
        backgroundColor: '#6c757d',
        marginTop: 10,
    },
});

export default ForgotPassword;
