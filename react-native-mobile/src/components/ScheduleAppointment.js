import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

function ScheduleAppointment() {
    const [description, setDescription] = useState("");
    const [appointment, setAppointment] = useState("");
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const apiIp = config.apiIp;

    const handleSchedule = () => {
        if (description === "" || appointment === "") {
            Alert.alert("Validation Error", "You must add a description and/or select a date to schedule an appointment.");
            return;
        }

        let data;

        AsyncStorage.getItem('userData')
            .then(userData => {
                if (userData) {
                    const dataUser = JSON.parse(userData);
                    data = {
                        id_user: parseInt(dataUser.id_user, 10),
                        descripcion: description,
                        fecha: appointment
                    }
                    // console.log(typeof dataUser.id_user);
                    // console.log(description)
                    // console.log(appointment)
                    fetch(`${apiIp}:5000/addCita`, {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json"
                        },
                    })
                        .then((response) => response.json())
                        .then((res) => {
                            if (res.success) {
                                Alert.alert("Programar cita", "Your appointment was successfully scheduled!");
                            } else {
                                Alert.alert("There was a problem scheduling your appointment, please try again.");
                            }
                            setDescription("");
                            setAppointment("");
                        })
                        .catch((error) => console.error(error));
                }
            })
            .catch(error => {
                console.error('Error al recuperar datos del usuario:', error);
            });
    };

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        // Formatear la fecha seleccionada
        const formattedDate = date.toISOString().split('T')[0];
        setAppointment(formattedDate);
        hideDatePicker();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Schedule Appointment</Text>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Description of the illness:</Text>
                <TextInput
                    style={styles.input}
                    multiline
                    numberOfLines={4}
                    placeholder="Tell us what illnesses you are experiencing"
                    value={description}
                    onChangeText={setDescription}
                />
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Choose a date:</Text>
                <View style={styles.buttonContainer}>
                    <Button title={appointment === "" ? "Select Date" : appointment} onPress={showDatePicker} />
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Schedule" onPress={handleSchedule} color="green" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    inputContainer: {
        marginBottom: 20,
        width: '100%',
    },
    label: {
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        minHeight: 100,
    },
    buttonContainer: {
        borderRadius: 20,
        overflow: 'hidden',
        color: "#007bff",
    },
});

export default ScheduleAppointment;
