import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, StyleSheet } from "react-native";

function ListaCitas() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [hora, setHora] = useState("");

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

  const [appointments, setAppointments] = useState(exampleAppointments);

  useEffect(() => {
    // Tu lógica para cargar citas
    // No incluido en esta versión adaptada
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

  const handleAcceptAppointment = () => {
    // Tu lógica para aceptar la cita
    // No incluido en esta versión adaptada
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
            onPress={handleAcceptAppointment}
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
