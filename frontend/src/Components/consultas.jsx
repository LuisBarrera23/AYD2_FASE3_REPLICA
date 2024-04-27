import React, { useState, useEffect } from "react";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Consultas = () => {
    const apiIp = process.env.REACT_APP_API_IP;
    const opcionesConsulta = ["Consulta 1", "Consulta 2", "Consulta 3", "Consulta 4", "Consulta 5"];
    const [consultaSeleccionada, setConsultaSeleccionada] = useState(opcionesConsulta[0]);
    const [titulo, setTitulo] = useState("");

    const [informacionConsulta, setinformacionConsulta] = useState([]);


    const [informacionConsulta2, setinformacionConsulta2] = useState([]);


    const [informacionConsulta3, setinformacionConsulta3] = useState([]);


    const [informacionConsulta4, setinformacionConsulta4] = useState([]);

    const [informacionConsulta5, setinformacionConsulta5] = useState([]);

    const handleConsultaChange = (e) => {
        const tipoConsulta = e.target.value;
        setConsultaSeleccionada(tipoConsulta);

        if (tipoConsulta === "Consulta 1") {
            fetch(`${apiIp}:8080/consulta1`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    setinformacionConsulta(res.resultado);
                    setTitulo(" Total de pacientes que llegan a la clínica por edad catalogados")
                    console.log(res);
                })
                .catch((error) => console.error(error));
        } else if (tipoConsulta === "Consulta 2") {
            fetch(`${apiIp}:8080/consulta2`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    setinformacionConsulta2(res.resultado);
                    console.log(res);
                    setTitulo("Cantidad de pacientes que pasan por cada habitación")
                })
                .catch((error) => console.error(error));
        } else if (tipoConsulta === "Consulta 3") {
            fetch(`${apiIp}:8080/consulta3`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    setinformacionConsulta3(res.resultado);
                    setTitulo("Cantidad de pacientes que llegan a la clínica por género")
                    console.log(res);
                })
                .catch((error) => console.error(error));
        } else if (tipoConsulta === "Consulta 4") {
            fetch(`${apiIp}:8080/consulta4`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    setinformacionConsulta4(res.resultado);
                    setTitulo("Top 5 edades más atendidas en la clínica")
                    console.log(res);
                })
                .catch((error) => console.error(error));
        } else if (tipoConsulta === "Consulta 5") {
            fetch(`${apiIp}:8080/consulta5`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    setinformacionConsulta5(res.resultado);
                    setTitulo("Top 5 edades menos atendidas en la clínica")
                    console.log(res);
                })
                .catch((error) => console.error(error));
        }
    };

    useEffect(() => {
        fetch(`${apiIp}:8080/consulta1`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then((res) => {
                setinformacionConsulta(res.resultado);
                console.log(res);
            })
            .catch((error) => console.error(error));

    }, []);
    return (
        <div className="consultas-container">
            <section className="consulta-selector">
                <label htmlFor="consulta">Selecciona una consulta:</label>
                <select id="consulta" value={consultaSeleccionada} onChange={handleConsultaChange}>
                    {opcionesConsulta.map((opcion, index) => (
                        <option key={index} value={opcion}>
                            {opcion}
                        </option>
                    ))}
                </select>
            </section>

            {consultaSeleccionada === "Consulta 1" && (
                <section className="consulta-info">
                    <div className="marco-cuadrado">

                        <h3>Consulta 1: <h5>{titulo}</h5> </h3>

                        <ul style={{ listStyle: "none", padding: "0", marginBottom: "10px" }}>
                            {informacionConsulta.map((item, index) => (
                                <li style={{ marginBottom: "10px" }} key={index}>
                                    <strong>{item._id}:</strong> {item.total}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {consultaSeleccionada === "Consulta 2" && (
                <section className="consulta-info">
                    <div className="marco-cuadrado">
                        <h3>Consulta 2: <h5>{titulo}</h5> </h3>
                        <ul style={{ listStyle: "none", padding: "0", marginBottom: "10px" }}>
                            {informacionConsulta2.map((item, index) => (
                                <li style={{ marginBottom: "10px" }} key={index}>
                                    <strong>ID de Habitación:</strong> {item.idHabitacion}, <strong>Cantidad de Pacientes:</strong> {item.cantidadPacientes} , <strong>Habitación:</strong> {item.habitacion}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {consultaSeleccionada === "Consulta 3" && (
                <section className="consulta-info">
                    <div className="marco-cuadrado">
                        <h3>Consulta 3: <h5>{titulo}</h5> </h3>
                        <ul style={{ listStyle: "none", padding: "0", marginBottom: "10px" }}>
                            {informacionConsulta3.map((item, index) => (
                                <li style={{ marginBottom: "10px" }} key={index}>
                                    <strong>Género:</strong> {item.genero}, <strong>Cantidad:</strong> {item.cantidad}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {consultaSeleccionada === "Consulta 4" && (
                <section className="consulta-info">
                    <div className="marco-cuadrado">
                        <h3>Consulta 4:<h5>{titulo}</h5> </h3>
                        <ul style={{ listStyle: "none", padding: "0", marginBottom: "10px" }}>
                            {informacionConsulta4.map((item, index) => (
                                <li style={{ marginBottom: "10px" }} key={index}>
                                    <strong>Edad:</strong> {item.edad}, <strong>Cantidad:</strong> {item.cantidad}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}

            {consultaSeleccionada === "Consulta 5" && (
                <section className="consulta-info">
                    <div className="marco-cuadrado">
                        <h3>Consulta 5: <h5>{titulo}</h5> </h3>
                        <ul style={{ listStyle: "none", padding: "0", marginBottom: "10px" }}>
                            {informacionConsulta5.map((item, index) => (
                                <li style={{ marginBottom: "10px" }} key={index}>
                                    <strong>Edad:</strong> {item.edad}, <strong>Cantidad:</strong> {item.cantidad}
                                </li>
                            ))}
                        </ul>
                    </div>
                </section>
            )}
        </div>
    );
};

export default Consultas;
