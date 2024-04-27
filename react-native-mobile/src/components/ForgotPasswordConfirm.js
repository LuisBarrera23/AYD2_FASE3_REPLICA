import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import ForgotPassword from "./ForgotPassword";

const PasswordResetModalContent = ({ onSubmit, onClose }) => {
    const [code, setCode] = useState("");
    const [newpass, setNewpass] = useState("");

    const handleSubmit = () => {
        onSubmit(code, newpass);
    };

    return (
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
            <TouchableOpacity onPress={onClose} style={[styles.button, styles.cancelButton]}>
                <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
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
    },
});

export default ForgotPasswordConfirm;
