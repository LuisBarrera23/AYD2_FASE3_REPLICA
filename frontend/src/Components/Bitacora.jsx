import React, { useState, useRef, useEffect, Fragment } from "react";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-h5-audio-player/lib/styles.css";
import Chart from "chart.js/auto";
import { useCookies } from 'react-cookie';

function Bitacora() {
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const [bitacora, setBitacora] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const isInitialMount = useRef(true);
    const apiIp = process.env.REACT_APP_API_IP;

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        fetch(`${apiIp}:5000/getBitacora/${cookies.usuario.id_user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                setBitacora(res.bitacora);
            })
            .catch((error) => console.error(error));
    }, [refreshKey]);

    const handleRefresh = () => {
        setRefreshKey((refreshKey) => refreshKey + 1);
    };

    return (
        <Fragment>
            <section className="home" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%", paddingBottom: "5%", overflowY: "auto" }}>
                <div className="profile-form" style={{ textAlign: "left", backgroundColor: "#0d0c1b", borderRadius: "25px", marginBottom: "5%" }}>
                    <h1>Logs base de datos:</h1>
                    <div className="form" style={{ justifyContent: "center", alignItems: 'center', height: "100%", display: "flex", flexDirection: "column" }}>
                        <div className="input-container" style={{ overflowY: "auto" }}>
                            <table className="table-light table table-bordered" style={{ fontSize: "16px", textAlign: "center" }}>
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Fecha_Hora</th>
                                        <th scope="col">Descripción</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {bitacora.map((log, index) => (
                                        <tr key={index}>
                                            <td scope="row" className="align-middle">{index + 1}</td>
                                            <td className="align-middle">{log.fechaHora}</td>
                                            <td className="align-middle">{log.description}</td>
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

export default Bitacora;
