import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, ScrollView  } from "react-native";

function HistorialCitas() {
    const [appointments, setAppointments] = useState([]);

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
        // Simulación de carga de citas
        setAppointments(exampleAppointments);
    }, []);

    const handleAcceptAppointment = (id) => {
        // Lógica para aceptar la cita
        console.log("Cita aceptada:", id);
    };

    const getClassByStatus = (status) => {
        // Lógica para obtener la clase de estilo según el estado
        switch (status) {
            case "Agendado":
                return styles.agendado;
            case "Atendido":
                return styles.atendido;
            case "Cancelado":
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
            case "Cancelado":
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
                            <Text style={ getClassByStatus(appointment.status)}>
                                {getSymbolByStatus(appointment.status)}
                            </Text>
                        )}
                        {appointment.status === "Agendado" && (
                            <TouchableOpacity
                                style={[styles.button,, styles.buttonContainer ]}
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
