import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [code, setCode] = useState("");
    const [newpass, setNewpass] = useState("");

    const handleResetPassword = () => {
        if (email !== "") {
            // Lógica para enviar el correo electrónico de restablecimiento de contraseña
            setModalIsOpen(true);
        } else {
            alert("Please enter your email.");
        }
    };

    const handleForgotPassword = () => {
        navigation.navigate("Login")
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = async () => {
        try {
            // Lógica para confirmar el restablecimiento de contraseña
            alert("Password reset successfully!");
        } catch (error) {
            console.error('Error en la solicitud fetch', error);
        }
        setNewpass("");
        setCode("");
        handleCloseModal();
    };

    return (
        <View style={styles.container}>
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

            <Modal
                visible={modalIsOpen}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Enter the code and reset password</Text>
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
                    <TouchableOpacity onPress={handleCloseModal} style={[styles.button, styles.cancelButton]}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
    },
    inputContainer: {
        marginBottom: 20,
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
