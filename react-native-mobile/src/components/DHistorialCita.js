import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';

function HistorialCitas() {
    const [appointments, setAppointments] = useState([]);
    const apiIp = config.apiIp;

    const exampleAppointments = [
        {
            id: 1,
            patientName: "Juan Pérez",
            description: "Consulta de rutina",
            date: "2024-04-27",
            status: "Agendado",
        },
        {
            id: 2,
            patientName: "María González",
            description: "Control de medicación",
            date: "2024-04-28",
            status: "Agendado",
        },
        {
            id: 3,
            patientName: "Luis Martínez",
            description: "Chequeo general",
            date: "2024-04-29",
            status: "Atendido",
        },
        {
            id: 4,
            patientName: "Ana García",
            description: "Consulta de seguimiento",
            date: "2024-04-30",
            status: "Cancelado",
        },
        {
            id: 5,
            patientName: "Ana García",
            description: "Consulta de seguimiento",
            date: "2024-04-30",
            status: "Cancelado",
        },
        {
            id: 6,
            patientName: "Ana García",
            description: "Consulta de seguimiento",
            date: "2024-04-30",
            status: "Cancelado",
        },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await AsyncStorage.getItem('userData');
                if (userData) {

                    const { id_user } = JSON.parse(userData);

                    const response = await fetch(`${apiIp}:5000/getCitasDoctor/${id_user}`);
                    const data = await response.json();
                    console.log(data)

                    if (Array.isArray(data['list'])) {
                        const formattedAppointments = data['list'].map(appointment => ({
                            id: appointment.id_cita,
                            patientName: appointment.paciente,
                            description: appointment.Descripcion,
                            date: format(new Date(appointment.fecha), 'yyyy-MM-dd'),
                            status: appointment.estado,

                        }));

                        setAppointments(formattedAppointments);
                    } else {
                        console.error('Error obtaining citas:', data.error);
                    }

                }
            } catch (error) {
                console.error('Error de red:', error);
            }
        };
        fetchData();
    }, []);

    const handleAcceptAppointment = async (id) => {

        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const { id_user } = JSON.parse(userData);
                const response = await fetch(`${apiIp}:5000/atenderCita`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_cita: id,
                        id_user_doctor: id_user
                    }),
                });

                const data = await response.json();
                if (response.ok) {
                    alert("Cita Atendida Correctamente")
                    if (Array.isArray(data['list'])) {
                        const formattedAppointments = data['list'].map(appointment => ({
                            id: appointment.id_cita,
                            patientName: appointment.paciente,
                            description: appointment.Descripcion,
                            date: format(new Date(appointment.fecha), 'yyyy-MM-dd'),
                            status: appointment.estado,
                        }));
                        setAppointments(formattedAppointments);
                    } else {
                        console.error('Error al procesar la respuesta:', data.error);
                    }
                } else {
                    // Procesar errores
                    console.error('Error al agendar la cita:', data);
                }
            }
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
        }
    };

    const getClassByStatus = (status) => {
        // Lógica para obtener la clase de estilo según el estado
        switch (status) {
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
        // Lógica para obtener el símbolo según el estado
        switch (status) {
            case "Agendado":
                return "◉";
            case "Atendido":
                return "✔";
            case "Cancelada":
                return "✖";
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>Historial de Citas</Text>
            <View style={styles.legend}>
                <Text style={[styles.legendItem, styles.agendado]}>◉ Agendado</Text>
                <Text style={[styles.legendItem, styles.atendido]}>✔ Atendido</Text>
                <Text style={[styles.legendItem, styles.cancelado]}>✖ Cancelado</Text>
            </View>

            <ScrollView style={styles.scrollContainer}>
                <View style={styles.appointmentsContainer}>
                    {appointments.map((appointment) => (
                        <View key={appointment.id} style={[styles.appointment, getClassByStatus(appointment.status)]}>
                            <Text style={styles.text}>ID: {appointment.id}</Text>
                            <Text style={styles.text}>Paciente: {appointment.patientName}</Text>
                            <Text style={styles.text}>Descripción: {appointment.description}</Text>
                            <Text style={styles.text}>Fecha: {appointment.date}</Text>

                            {appointment.status !== "Agendado" && (
                                <Text style={getClassByStatus(appointment.status)}>
                                    {getSymbolByStatus(appointment.status)}
                                </Text>
                            )}
                            {appointment.status === "Agendado" && (
                                <TouchableOpacity
                                    style={[styles.button, , styles.buttonContainer]}
                                    onPress={() => handleAcceptAppointment(appointment.id)}
                                >
                                    <Text style={styles.buttonText}>
                                        Atender
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
        backgroundColor: '#0842D2',
        border: "5px",
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
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

export default HistorialCitas;
