import React, { useState, Fragment, useEffect } from "react";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/styles.css";
import { format } from 'date-fns';
import { useCookies } from 'react-cookie';


function ListaCitas() {

    const apiIp = process.env.REACT_APP_API_IP;
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [hora, setHora] = useState('');
    const [cookies, setCookie] = useCookies(['usuario']);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch(`${apiIp}:5000/getCitasEsperando/${cookies.usuario.id_user}`);
                const data = await response.json();
                console.log(data)
                const list = data.List

                if (Array.isArray(data.list)) {
                    const formattedAppointments = data.list.map(appointment => ({
                        id: appointment.id_cita,
                        patientName: appointment.paciente,
                        description: appointment.Descripcion,
                        date: format(new Date(appointment.fecha), 'yyyy-MM-dd')
                    }));

                    setAppointments(formattedAppointments);
                } else {
                    console.error('Error obtaining citas:', data.error);
                }
            } catch (error) {
                console.error('Error obtaining citas:', error);
            }
        };

        fetchAppointments();
    }, []);

    const handleOpenModal = (appointment) => {
        setSelectedAppointment(appointment);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setSelectedAppointment(null);
        setModalIsOpen(false);
    };

    const handleHoraChange = (event) => {
        setHora(event.target.value);
    };

    const handleAcceptAppointment = async () => {
        try {
            const response = await fetch(`${apiIp}:5000/agendarCita`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id_cita: selectedAppointment.id,
                id_user_doctor: cookies.usuario.id_user,
                hora: hora,
              }),
            });
      
            const data = await response.json();
            console.log(data)
            console.log(cookies)
            if (response.ok) {
                // Procesar la respuesta exitosa y actualizar el estado
                alert("Cita Agendada Correctamente")
                if (Array.isArray(data.list)) {
                  const formattedAppointments = data.list.map(appointment => ({
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
          } catch (error) {
            console.error('Error al realizar la solicitud:', error);
          }
        setHora("");
        handleCloseModal();
    };

    return (
        <Fragment>
            <section className="home" style={{ display: 'flex', justifyContent: "center", alignItems: "center", paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%", paddingBottom: "5%" }}>
                <div className="profile-form" style={{ textAlign: "left", backgroundColor: "#0d0c1b", overflowY: "auto", borderRadius: "25px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <h1>Citas pendientes de ser Agendadas</h1>
                    <div className="form" style={{ justifyContent: "center", alignItems: 'center' }}>
                        <div className="table-responsive">
                            <table className="table table-dark table-striped">
                                <thead>
                                    <tr>
                                        <th style={{ width: '5%' }}>ID</th>
                                        <th style={{ width: '13%' }}>Paciente</th>
                                        <th>Descripción</th>
                                        <th style={{ width: '20%' }}> Fecha</th>
                                        <th>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* Mapear las citas y mostrarlas en la tabla */}
                                    {appointments.map((appointment) => (
                                        <tr key={appointment.id}>
                                            <td>{appointment.id}</td>
                                            <td>{appointment.patientName}</td>
                                            <td>{appointment.description}</td>
                                            <td>{appointment.date}</td>
                                            <td>
                                                <button
                                                    type="button"
                                                    className="btn btn-outline-info"
                                                    onClick={() => handleOpenModal(appointment)}
                                                >
                                                    Detalles
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Modal para mostrar detalles y aceptar la cita */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={handleCloseModal}
                    contentLabel="Detalles de la Cita"
                    ariaHideApp={false}
                    className="custom-modal" // Clase personalizada para el modal
                    overlayClassName="custom-overlay" // Clase personalizada para el overlay
                >
                    {selectedAppointment && (
                        <div className="custom-modal-content">
                            <div className="custom-modal-header">
                                <h5 className="custom-modal-title">Detalles de la Cita</h5>
                                <button className="custom-modal-close" onClick={handleCloseModal}>
                                    &times;
                                </button>
                            </div>
                            <div className="custom-modal-padding">
                                <div>
                                    <label htmlFor="idInput">ID:</label>
                                    <p id="idInput">{selectedAppointment.id}</p>
                                </div>

                                <div>
                                    <label htmlFor="patientNameInput">Nombre Paciente:</label>
                                    <p id="patientNameInput">{selectedAppointment.patientName}</p>
                                </div>

                                <div>
                                    <label htmlFor="descriptionInput">Descripción:</label>
                                    <p id="descriptionInput">{selectedAppointment.description}</p>
                                </div>

                                <div>
                                    <label htmlFor="dateInput">Fecha:</label>
                                    <p id="dateInput">{selectedAppointment.date}</p>
                                </div>

                                <div>
                                    <label htmlFor="horaInput">Hora:</label>
                                    <input
                                        type="text"
                                        id="horaInput"
                                        value={hora}  
                                        onChange={handleHoraChange}  
                                    />
                                </div>

                                <div className="modal-footer">
                                    <button type="button" className="btn btn-outline-success" onClick={handleAcceptAppointment}>
                                        Aceptar Cita
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </Modal>
            </section>
        </Fragment>
    );
}

export default ListaCitas;

