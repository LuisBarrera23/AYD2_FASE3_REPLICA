import React, { useState, Fragment, useEffect } from "react";
import Modal from "react-modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles/styles.css";
import { useCookies } from 'react-cookie';
import { format } from 'date-fns';


function HistorialCitas() {

  const apiIp = process.env.REACT_APP_API_IP;
  const [cookies, setCookie] = useCookies(['usuario']);
  const [appointments, setAppointments] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiIp}:5000/getCitasDoctor/${cookies.usuario.id_user}`);
        const data = await response.json();
        console.log(data)
        if (Array.isArray(data.list)) {
          const formattedAppointments = data.list.map(appointment => ({
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
      } catch (error) {
        console.error('Error de red:', error);
      }
    };
    fetchData();
  }, []);

  const handleAcceptAppointment = async (id) => {
    console.log(id);
    console.log(cookies.usuario.id_user);
    try {
      const response = await fetch(`${apiIp}:5000/atenderCita`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_cita: id,
          id_user_doctor: cookies.usuario.id_user
        }),
      });

      const data = await response.json();
      if (response.ok) {
          // Procesar la respuesta exitosa y actualizar el estado
          alert("Cita Atendida Correctamente")
          if (Array.isArray(data.list)) {
            const formattedAppointments = data.list.map(appointment => ({
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
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  };

  const getClassByStatus = (status) => {
    switch (status) {
      case 'Agendado':
        return 'agendado';
      case 'Atendido':
        return 'atendido';
      case 'Cancelado':
        return 'cancelado';
      default:
        return '';
    }
  };

  const getSymbolByStatus = (status) => {
    switch (status) {
      case 'Agendado':
        return '◉'; // Emoji azul para agendado
      case 'Atendido':
        return '✔'; // Emoji verde para atendido
      case 'Cancelado':
        return '✖'; // Emoji rojo para cancelado
      default:
        return '';
    }
  };

  return (
    <Fragment>
      <section className="home" style={{ display: 'flex', justifyContent: "center", alignItems: "center", paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%", paddingBottom: "5%" }}>
        <div className="profile-form" style={{ textAlign: "left", backgroundColor: "#0d0c1b", overflowY: "auto", borderRadius: "25px", display: "flex", alignItems: "center", flexDirection: "column" }}>
          <h1>Historial de Citas</h1>
          <div style={{ marginBottom: "20px" }}>
            <ul className="horizontal-list">
              <li><span className="agendado">◉</span> Agendado</li>
              <li><span className="atendido">✔</span> Atendido</li>
              <li><span className="cancelado">✖</span> Cancelado</li>
            </ul>
          </div>
          <div className="form" style={{ justifyContent: "center", alignItems: 'center' }}>
            <div className="table-responsive">
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Paciente</th>
                    <th>Descripción</th>
                    <th style={{ width: '20%' }}>Fecha</th>
                    <th>Estado</th>
                    <th colSpan="2">Attend</th>
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
                      <td className={getClassByStatus(appointment.status)}>
                        {getSymbolByStatus(appointment.status)}
                      </td>
                      <td style={{ width: '1%', textAlign: 'center' }}>
                        {appointment.status === 'Agendado' && (
                          <button
                            className="btn btn-success"
                            onClick={() => handleAcceptAppointment(appointment.id)}
                            style={{ width: '60%' }}
                          >
                            ✔
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default HistorialCitas;

