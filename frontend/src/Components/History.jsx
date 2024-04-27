import React, { useState, useRef, useEffect, Fragment } from "react";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from 'react-cookie';
import { format, parseISO } from 'date-fns';
import "react-h5-audio-player/lib/styles.css";

function History(props) {
    const [listaCitas, setListaCitas] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const isInitialMount = useRef(true);
    const apiIp = process.env.REACT_APP_API_IP;

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        fetch(`${apiIp}:5000/getCitas/${props.id_user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((res) => {
                setListaCitas(res.list.reverse());
            })
            .catch((error) => console.error(error));
    }, [refreshKey]);

    const getClassByStatus = (status) => {
        switch (status) {
            case 'En espera':
                return 'agendado';
            case 'Agendado':
                return 'atendido';
            case 'Cancelada':
                return 'cancelado';
            default:
                return '';
        }
    };

    const getSymbolByStatus = (status) => {
        switch (status) {
            case 'En espera':
                return '◉'; // Emoji azul para agendado
            case 'Agendado':
                return '✔'; // Emoji verde para atendido
            case 'Cancelada':
                return '✖'; // Emoji rojo para cancelado
            default:
                return '';
        }
    };

    const handleRefresh = () => {
        // Incrementa refreshKey para forzar una actualización de renderizado
        setRefreshKey((refreshKey) => refreshKey + 1);
    };

    const handleCancelClick = (citaId) => {
        // alert(`Cancelar cita con ID: ${citaId}`);

        const data = {
            id_cita: citaId,
            id_user: props.id_user
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
                console.log(res)
                if (res.success) {
                    alert("Your appointment was canceled.");
                    handleRefresh();
                } else {
                    alert("There was an error, please try again.");
                }
            })
            .catch((error) => console.error(error));
    };

    const getButtonByStatus = (status, citaId) => {
        switch (status) {
            case 'En espera':
                return (
                    <button
                        type="button"
                        onClick={() => handleCancelClick(citaId)}
                        className="btn btn-outline-danger"
                        style={{ width: 'auto', height: 'auto' }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                        </svg>
                    </button>
                );
            case 'Agendado':
            case 'Cancelada':
                return null;
            default:
                return null;
        }
    };

    return (
        <Fragment>
            <section className="home" style={{ display: 'flex', justifyContent: "center", alignItems: "center", paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%", paddingBottom: "5%" }}>
                <div className="profile-form" style={{ textAlign: "left", backgroundColor: "#0d0c1b", overflowY: "auto", borderRadius: "25px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <h1>Appointment history</h1>
                    <div className="form" style={{ justifyContent: "center", alignItems: 'center', height: "100%", display: "flex", flexDirection: "column" }}>
                        <div className="input-container">
                            <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
                                <ul className="horizontal-list">
                                    <li><span className="agendado">◉</span> Agendado</li>
                                    <li><span className="atendido">✔</span> Atendido</li>
                                    <li><span className="cancelado">✖</span> Cancelado</li>
                                </ul>
                            </div>
                            <table className="table-info table table-bordered" style={{ fontSize: "16px", textAlign: "center" }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Doctor</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">State</th>
                                        <th scope="col">Cancel</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {listaCitas.map((cita, index) => (
                                        <tr key={cita.id_cita}>
                                            <td scope="row" className="align-middle">{index + 1}</td>
                                            <td className="align-middle">{cita.doctor}</td>
                                            <td className="align-middle">
                                                {format(parseISO(cita.fecha), 'dd/MM/yyyy')}
                                            </td>
                                            <td className="align-middle">{cita.hora}</td>
                                            <td className="align-middle">{cita.Descripcion}</td>
                                            <td className={`align-middle ${getClassByStatus(cita.estado)}`}>
                                                {getSymbolByStatus(cita.estado)}
                                            </td>
                                            <td className="align-middle">
                                                {getButtonByStatus(cita.estado, cita.id_cita)}
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

export default History;
