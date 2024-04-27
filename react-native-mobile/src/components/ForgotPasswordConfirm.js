import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, Alert } from "react-native";
import config from '../../config';

const ForgotPasswordConfirm = ({ navigation }) => {
    const [code, setCode] = useState("");
    const [newpass, setNewpass] = useState("");
    const [email, setEmail] = useState("");
    const apiIp = config.apiIp;

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${apiIp}:5000/confirmPasswordReset`, { // Reemplaza YOUR_API_IP con la IP de tu servidor
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo: email, 
                    verificationCode: code,
                    newPassword: newpass,
                }),
            });
    
            if (response.ok) {
                const result = await response.json();
                Alert.alert("Success", result.message);
                setNewpass("");
                setCode("");
                setEmail("")
                navigation.navigate("Login");
            } else {
                const result = await response.json();
                Alert.alert("Error", result.message);
                console.error('Error en la solicitud al servidor', result);
            }
        } catch (error) {
            console.error('Error en la solicitud fetch', error);
        }
    
        
    };

    const handleClose = (code, newpass) => {
        navigation.navigate("ForgotPassword")
    };

    return (
        <ImageBackground
            source={require("../Images/imagenForgot.jpg")}
            style={styles.backgroundImage}
        >
            <View style={styles.container}>
                <View style={styles.container2}>
                    <Text style={styles.modalTitle}>Enter the code and reset password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm your email"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Code"
                        value={code}
                        onChangeText={setCode}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="New Password"
                        secureTextEntry
                        value={newpass}
                        onChangeText={setNewpass}
                    />
                    <TouchableOpacity onPress={handleSubmit} style={[styles.button, styles.submitButton]}>
                        <Text style={styles.buttonText}>Send</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleClose} style={[styles.button, styles.cancelButton]}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
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
    }, container2: {
        flex: 1,
        justifyContent: 'center',
        width: "auto",
        maxHeight: 400,
        padding: 15,
        borderRadius: 10,
        backgroundColor: "rgba(255, 255, 255, 0.9)", // Fondo semitransparente
    },
    backgroundImage: {
        flex: 1,
        resizeMode: "cover", // O ajusta según tu preferencia
        justifyContent: "center"
    },
    modalTitle: {
        fontSize: 18,
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        fontSize: 16,
        marginBottom: 10,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        borderWidth: 1,
        marginBottom: 10,
    },
    submitButton: {
        backgroundColor: '#007BFF',
    },
    cancelButton: {
        backgroundColor: '#6c757d',
    },
    buttonText: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: "center",
    }
});

export default ForgotPasswordConfirm;
