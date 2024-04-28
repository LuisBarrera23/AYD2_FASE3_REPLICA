import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from "react-native";
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';

function HistorialCitasPaciente() {
    const [listaCitas, setListaCitas] = useState([]);
    const [reloadComponent, setReloadComponent] = useState(false);
    const apiIp = config.apiIp;

    useEffect(() => {
        AsyncStorage.getItem('userData')
            .then(userData => {
                if (userData) {
                    const dataUser = JSON.parse(userData);
                    fetch(`${apiIp}:5000/getCitas/${dataUser.id_user}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then((response) => response.json())
                        .then((res) => {
                            setListaCitas(res?.list.reverse());
                        })
                        .catch((error) => console.error(error));
                }
            })
            .catch(error => {
                console.error('Error al recuperar datos del usuario:', error);
            });
    }, [reloadComponent]);

    const handleCancelClick = (citaId) => {
        AsyncStorage.getItem('userData')
            .then(userData => {
                if (userData) {
                    const dataUser = JSON.parse(userData);
                    const data = {
                        id_cita: citaId,
                        id_user: dataUser.id_user
                    }

                    fetch(`${apiIp}:5000/cancelCita`, {
                        method: "PUT",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                        },
                    })
                        .then((response) => response.json())
                        .then((res) => {
                            // console.log(res)
                            if (res.success) {
                                Alert.alert('Citas', "Your appointment was canceled.", [
                                    {
                                        text: 'OK',
                                        onPress: () => setReloadComponent(!reloadComponent)
                                    }
                                ]);
                            } else {
                                Alert.alert('Citas', "There was an error, please try again.");
                            }
                        })
                        .catch((error) => console.error(error));
                }
            })
            .catch(error => {
                console.error('Error al recuperar datos del usuario:', error);
            });
    };

    const getClassByStatus = (status) => {
        switch (status) {
            case "En espera":
                return styles.espera;
            case "Agendado":
                return styles.agendado;
            case "Atendido":
                return styles.atendido;
            case "Cancelada":
                return styles.cancelado;
            default:
                return null;
        }
    };

    const getSymbolByStatus = (status) => {
        switch (status) {
            case "En espera":
                return "⌛";
            case "Agendado":
                return "◉";
            case "Atendido":
                return "✔️";
            case "Cancelada":
                return "❌";
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Historial de Citas</Text>
            <View style={styles.legend}>
                <Text style={[styles.legendItem, styles.espera]}>⌛ En espera</Text>
                <Text style={[styles.legendItem, styles.agendado]}>◉ Agendado</Text>
                <Text style={[styles.legendItem, styles.atendido]}>✔️ Atendido</Text>
                <Text style={[styles.legendItem, styles.cancelado]}>❌ Cancelada</Text>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.appointmentsContainer}>
                    {listaCitas.map((appointment) => (
                        <View key={appointment.id_cita} style={[styles.appointment, getClassByStatus(appointment.estado)]}>
                            <Text style={styles.text}>Id: {appointment.id_cita}</Text>
                            <Text style={styles.text}>Doctor: {appointment.doctor}</Text>
                            <Text style={styles.text}>Descripcion: {appointment.Descripcion}</Text>
                            <Text style={styles.text}>Fecha: {appointment.fecha}</Text>
                            <Text style={styles.text}>Hora: {appointment.hora}</Text>

                            {appointment.estado !== "En espera" && (
                                <Text style={getClassByStatus(appointment.status)}>
                                    {getSymbolByStatus(appointment.status)}
                                </Text>
                            )}
                            {(appointment.estado === "En espera" || appointment.estado === "Agendado") && (
                                <TouchableOpacity
                                    style={[styles.button]}
                                    onPress={() => handleCancelClick(appointment.id_cita)}
                                >
                                    <Text style={styles.buttonText}>
                                        Cancelar cita
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    ))}
                </View>
            </ScrollView>
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
    legend: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    legendItem: {
        marginRight: 10,
    },
    scrollContainer: {
        flex: 1,
        width: '100%',
    },
    appointmentsContainer: {
        alignItems: 'center',
    },
    appointment: {
        width: '90%',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
    },
    text: {
        marginBottom: 5,
    },
    statusText: {
        fontWeight: 'bold',
    },
    button: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF4F4F',
        border: "5px",
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    espera: {
        backgroundColor: 'lightyellow', // Color de fondo para el estado 'Agendado'
    },
    agendado: {
        backgroundColor: 'lightblue', // Color de fondo para el estado 'Agendado'
    },
    atendido: {
        backgroundColor: 'lightgreen', // Color de fondo para el estado 'Atendido'
    },
    cancelado: {
        backgroundColor: 'lightcoral', // Color de fondo para el estado 'Cancelado'
    },
});

export default HistorialCitasPaciente;
