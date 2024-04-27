import React, { useState, useRef, useEffect, Fragment } from "react";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { format, parseISO } from 'date-fns';
import "react-h5-audio-player/lib/styles.css";

function ComprasHistorial(props) {
    const [listaCompras, setListaCompras] = useState([
        {
            id_compra: 1,
            fecha: "2022-01-01",
            hora: "08:00 AM",
            metodo: "Tarjeta de crédito",
            direccion: "123 Calle Principal",
            total: 100.00
        },
        {
            id_compra: 2,
            fecha: "2022-01-02",
            hora: "09:00 AM",
            metodo: "Efectivo",
            direccion: "456 Avenida Secundaria",
            total: 50.00
        }
    ]);
    const isInitialMount = useRef(true);
    const apiIp = process.env.REACT_APP_API_IP;

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        fetch(`${apiIp}:5000/getCompras/${props.id_user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((res) => {
                
                setListaCompras(res.list.reverse());
            })
            .catch((error) => console.error(error));
    }, []);

    return (
        <Fragment>
            <section className="home" style={{ display: 'flex', justifyContent: "center", alignItems: "center", paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%", paddingBottom: "5%" }}>
                <div className="profile-form" style={{ textAlign: "left", backgroundColor: "#0d0c1b", overflowY: "auto", borderRadius: "25px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <h1>Shopping history</h1>
                    <div className="form" style={{ justifyContent: "center", alignItems: 'center', height: "100%", display: "flex", flexDirection: "column" }}>
                        <div className="input-container">
                            <table className="table-info table table-bordered" style={{ fontSize: "16px", textAlign: "center" }}>
                                <thead>
                                    <tr>
                                        <th scope="col">Id</th>
                                        <th scope="col">Date</th>
                                        <th scope="col">Time</th>
                                        <th scope="col">Method</th>
                                        <th scope="col">Address</th>
                                        <th scope="col">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {listaCompras.map((compra, index) => (
                                        <tr key={compra.id_compra}>
                                            <td scope="row" className="align-middle">{index + 1}</td>
                                            <td className="align-middle">
                                                {format(parseISO(compra.fecha), 'dd/MM/yyyy')}
                                            </td>
                                            <td className="align-middle">{compra.hora}</td>
                                            <td className="align-middle">{compra.metodo}</td>
                                            <td className="align-middle">{compra.direccion}</td>
                                            <td className="align-middle"> Q{compra.total}</td>
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

export default ComprasHistorial;
