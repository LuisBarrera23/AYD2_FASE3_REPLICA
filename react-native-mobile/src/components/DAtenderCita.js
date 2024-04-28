import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, StyleSheet } from "react-native";
import config from '../../config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { format } from 'date-fns';


function ListaCitas() {
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [hora, setHora] = useState("");
    const apiIp = config.apiIp;

    const exampleAppointments = [
        {
            id: 1,
            patientName: "Juan Pérez",
            description: "Consulta de rutina",
            date: "2024-04-27",
        },
        {
            id: 2,
            patientName: "María González",
            description: "Control de medicación",
            date: "2024-04-28",
        },
        {
            id: 3,
            patientName: "Luis Martínez",
            description: "Chequeo general",
            date: "2024-04-29",
        },
        {
            id: 4,
            patientName: "Luis Martínez",
            description: "Chequeo general",
            date: "2024-04-29",
        },
        {
            id: 5,
            patientName: "Luis Martínez",
            description: "Chequeo general",
            date: "2024-04-29",
        },
        {
            id: 6,
            patientName: "Luis Martínez",
            description: "Chequeo general",
            date: "2024-04-29",
        }
    ];

    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {

                const userData = await AsyncStorage.getItem('userData');
                if (userData) {
                    const { id_user } = JSON.parse(userData);
                    const response = await fetch(`${apiIp}:5000/getCitasEsperando/${id_user}`);
                    const data = await response.json();
                    console.log(data);

                    if (Array.isArray(data['list'])) {
                        const formattedAppointments = data['list'].map(appointment => ({
                            id: appointment.id_cita,
                            patientName: appointment.paciente,
                            description: appointment.Descripcion,
                            date: format(new Date(appointment.fecha), 'yyyy-MM-dd')
                        }));

                        setAppointments(formattedAppointments);
                    } else {
                        console.error('Error obtaining citas:', data.error);
                    }
                    console.log("ID de usuario:", id_user);
                }

            } catch (error) {
                console.error('Error obtaining citas:', error);
            }
        };

        fetchAppointments();
    }, []);


    const handleOpenModal = (appointment) => {
        setSelectedAppointment(appointment);
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setHora("");
        setSelectedAppointment(null);
    };

    const handleHoraChange = (text) => {
        setHora(text);
    };

    const handleAcceptAppointment = async (id) => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const { id_user } = JSON.parse(userData);
                const response = await fetch(`${apiIp}:5000/agendarCita`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_cita: id,
                        id_user_doctor: id_user,
                        hora: hora,
                    }),
                });
    
                const data = await response.json();
                console.log(data)
                if (response.ok) {
                    // Procesar la respuesta exitosa y actualizar el estado
                    alert("Cita Agendada Correctamente");
                    if (Array.isArray(data['list'])) {
                        const formattedAppointments = data['list'].map(appointment => ({
                            id: appointment.id_cita,
                            patientName: appointment.paciente,
                            description: appointment.Descripcion,
                            date: format(new Date(appointment.fecha), 'yyyy-MM-dd')
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
        setHora("");
        handleCloseModal();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Seleccione una cita para agendar:</Text>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                {appointments.map((appointment) => (
                    <TouchableOpacity key={appointment.id} onPress={() => handleOpenModal(appointment)}>
                        <View style={styles.appointmentCard}>
                            <Text style={styles.cardText}>ID: {appointment.id}</Text>
                            <Text style={styles.cardText}>Paciente: {appointment.patientName}</Text>
                            <Text style={styles.cardText}>Descripción: {appointment.description}</Text>
                            <Text style={styles.cardText}>Fecha: {appointment.date}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Modal */}
            <Modal
                visible={modalVisible}
                animationType="slide"
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Detalles de la Cita</Text>
                    <Text style={styles.modalText}>ID: {selectedAppointment?.id}</Text>
                    <Text style={styles.modalText}>Nombre Paciente: {selectedAppointment?.patientName}</Text>
                    <Text style={styles.modalText}>Descripción: {selectedAppointment?.description}</Text>
                    <Text style={styles.modalText}>Fecha: {selectedAppointment?.date}</Text>

                    <TextInput
                        style={styles.input}
                        placeholder="Hora"
                        value={hora}
                        onChangeText={handleHoraChange}
                    />

                    <TouchableOpacity
                        style={[styles.button, styles.buttonAccept]}
                        onPress={() => handleAcceptAppointment(selectedAppointment?.id)}
                    >
                        <Text style={styles.buttonText}>Aceptar Cita</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={handleCloseModal}
                    >
                        <Text style={styles.buttonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FAFED2",
        padding: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },
    scrollContainer: {
        alignItems: "center",
    },
    appointmentCard: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        backgroundColor: "#D2F6FE",
        marginBottom: 10,
        width: "100%",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    cardText: {
        fontSize: 16,
        marginBottom: 5,
    },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    modalText: {
        fontSize: 16,
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
        width: "100%",
    },
    button: {
        borderRadius: 5,
        padding: 15,
        width: "100%",
        alignItems: "center",
        marginBottom: 10,
    },
    buttonAccept: {
        backgroundColor: "green",
    },
    buttonClose: {
        backgroundColor: "red",
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
    },
});

export default ListaCitas;
