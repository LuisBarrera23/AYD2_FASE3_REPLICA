import React, { useState, useEffect } from "react";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from 'react-cookie';

function EliminarUsuario() {
    const [doctors, setDoctors] = useState([{ id_user: 0, nombre: "Juan", username: "juanito"}]);
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const apiIp = process.env.REACT_APP_API_IP;

    useEffect(() => {
        fetchUsuarios();
    }, []);

    const fetchUsuarios = () => {
        fetch(`${apiIp}:5000/getUsuarios/${cookies.usuario.id_user}`)
            .then((response) => response.json())
            .then((data) => {
                setDoctors(data);
            })
            .catch((error) => console.error(error));
    };

    const handleDelete = (id) => {
        fetch(`${apiIp}:5000/deleteUser`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id_user: id })
        })
        .then((response) => response.json())
        .then((res) => {
            // Refresca la lista de doctores después de la eliminación
            fetchUsuarios();
            alert(res.message);
        })
        .catch((error) => console.error(error));
    };

    return (
        <section className="home" style={{ display: 'flex', justifyContent: "center", alignItems: "center", paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%", paddingBottom: "5%" }}>
            <div className="profile-form" style={{ textAlign: "left", backgroundColor: "#0d0c1b", overflowY: "auto", borderRadius: "25px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                <div className="form">
                    <h3>Lista de Usuarios</h3>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>ID</th>
                                <th>Username</th>
                                <th>Accion</th>
                            </tr>
                        </thead>
                        <tbody>
                            {doctors.map((doctor) => (
                                <tr key={doctor.id_user}>
                                    <td>{doctor.nombre}</td>
                                    <td>{doctor.id_user}</td>
                                    <td>{doctor.username}</td>
                                    <td>
                                        <button type="button" className="btn btn-danger" onClick={() => handleDelete(doctor.id_user)}>
                                            Eliminar
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

export default EliminarUsuario;