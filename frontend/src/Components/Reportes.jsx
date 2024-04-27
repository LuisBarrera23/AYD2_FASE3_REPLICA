import React, { useState, useRef, useEffect, Fragment } from "react";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-h5-audio-player/lib/styles.css";
import Chart from "chart.js/auto";
import { useCookies } from 'react-cookie';

function Reportes() {
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const [reporte1, setReporte1] = useState([]);
    const [reporte2, setReporte2] = useState([]);
    const [reporte3, setReporte3] = useState([]);
    // const [reporte3, setReporte3] = useState([
    //     { nombre: "Producto A", stock: 100 },
    //     { nombre: "Producto B", stock: 80 },
    //     { nombre: "Producto C", stock: 120 }
    // ]);
    const [reporte4, setReporte4] = useState([]);
    const [reporte5, setReporte5] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const isInitialMount = useRef(true);
    const apiIp = process.env.REACT_APP_API_IP;

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        fetch(`${apiIp}:5000/getReportes/${cookies.usuario.id_user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                setReporte1(res.reporte1);
                setReporte2(res.reporte2);
                setReporte3(res.reporte3);
                setReporte4(res.reporte4);
                setReporte5(res.reporte5);
            })
            .catch((error) => console.error(error));
    }, [refreshKey]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Obtener el canvas existente
        const existingCanvas = document.getElementById("reporte3Chart");

        // Destruir el gráfico existente si existe
        if (existingCanvas) {
            existingCanvas.remove();
        }

        // Crear un nuevo canvas
        const newCanvas = document.createElement("canvas");
        newCanvas.id = "reporte3Chart";

        // Agregar el nuevo canvas al contenedor
        const container = document.querySelector("#reporte3Container");
        container.appendChild(newCanvas);

        // Crear el gráfico de barras en el nuevo canvas
        const ctx = newCanvas.getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: reporte3.map(producto => producto.name),
                datasets: [{
                    label: "Stock",
                    data: reporte3.map(producto => producto.stock),
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        grid: {
                            color: 'blue'
                        },
                        beginAtZero: true,
                        ticks: {
                            color: 'white'
                        }
                    },
                    x: {
                        ticks: {
                            color: 'white'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        });
    }, [reporte3]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Obtener el canvas existente
        const existingCanvas = document.getElementById("reporte4Chart");

        // Destruir el gráfico existente si existe
        if (existingCanvas) {
            existingCanvas.remove();
        }

        // Crear un nuevo canvas
        const newCanvas = document.createElement("canvas");
        newCanvas.id = "reporte4Chart";

        // Agregar el nuevo canvas al contenedor
        const container = document.querySelector("#reporte4Container");
        container.appendChild(newCanvas);

        // Crear el gráfico de barras en el nuevo canvas
        const ctx = newCanvas.getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: reporte4.map(producto => producto.name),
                datasets: [{
                    label: "Stock",
                    data: reporte4.map(producto => producto.stock),
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                        'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 99, 132)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                        'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        grid: {
                            color: 'blue'
                        },
                        beginAtZero: true,
                        ticks: {
                            color: 'white'
                        }
                    },
                    x: {
                        ticks: {
                            color: 'white'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        });
    }, [reporte4]);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        // Obtener el canvas existente
        const existingCanvas = document.getElementById("reporte5Chart");

        // Destruir el gráfico existente si existe
        if (existingCanvas) {
            existingCanvas.remove();
        }

        // Crear un nuevo canvas
        const newCanvas = document.createElement("canvas");
        newCanvas.id = "reporte5Chart";

        // Agregar el nuevo canvas al contenedor
        const container = document.querySelector("#reporte5Container");
        container.appendChild(newCanvas);

        // Crear el gráfico de barras en el nuevo canvas
        const ctx = newCanvas.getContext("2d");
        new Chart(ctx, {
            type: "bar",
            data: {
                labels: reporte5.map(producto => producto.name),
                datasets: [{
                    label: "Price",
                    data: reporte5.map(producto => producto.price),
                    backgroundColor: [
                        'rgba(201, 203, 207, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 205, 86, 0.2)',
                    ],
                    borderColor: [
                        'rgb(201, 203, 207)',
                        'rgb(75, 192, 192)',
                        'rgb(255, 99, 132)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                        'rgb(255, 159, 64)',
                        'rgb(255, 205, 86)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        grid: {
                            color: 'blue'
                        },
                        beginAtZero: true,
                        ticks: {
                            color: 'white'
                        }
                    },
                    x: {
                        ticks: {
                            color: 'white'
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'white'
                        }
                    }
                }
            }
        });
    }, [reporte5]);

    const handleRefresh = () => {
        setRefreshKey((refreshKey) => refreshKey + 1);
    };

    return (
        <Fragment>
            <section className="home" style={{ paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%", paddingBottom: "5%", overflowY: "auto" }}>
                <div className="profile-form" style={{ textAlign: "left", backgroundColor: "#0d0c1b", borderRadius: "25px", marginBottom: "5%" }}>
                    <h1>Últimos 5 usuarios registrados:</h1>
                    <div className="form" style={{ justifyContent: "center", alignItems: 'center', height: "100%", display: "flex", flexDirection: "column" }}>
                        <div className="input-container" style={{ overflowY: "auto" }}>
                            <table className="table-light table table-bordered" style={{ fontSize: "16px", textAlign: "center" }}>
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Username</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {reporte1.map((user, index) => (
                                        <tr key={index}>
                                            <td scope="row" className="align-middle">{index + 1}</td>
                                            <td className="align-middle">{user.name}</td>
                                            <td className="align-middle">{user.email}</td>
                                            <td className="align-middle">{user.username}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="profile-form" style={{ textAlign: "left", backgroundColor: "#0d0c1b", borderRadius: "25px", marginBottom: "5%" }}>
                    <h1>Doctores con mayor cantidad de citas atendidas:</h1>
                    <div className="form" style={{ justifyContent: "center", alignItems: 'center', height: "100%", display: "flex", flexDirection: "column" }}>
                        <div className="input-container" style={{ overflowY: "auto" }}>
                            <table className="table-light table table-bordered" style={{ fontSize: "16px", textAlign: "center" }}>
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Email</th>
                                        <th scope="col">Username</th>
                                        <th scope="col">Citas atendidas</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {reporte2.map((user, index) => (
                                        <tr key={index}>
                                            <td scope="row" className="align-middle">{index + 1}</td>
                                            <td className="align-middle">{user.name}</td>
                                            <td className="align-middle">{user.email}</td>
                                            <td className="align-middle">{user.username}</td>
                                            <td className="align-middle">{user.citas}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="profile-form" style={{ textAlign: "left", backgroundColor: "#0d0c1b", borderRadius: "25px", marginBottom: "5%" }}>
                    <h1>Top 3 productos con mayor stock</h1>
                    <div className="form" style={{ justifyContent: "center", alignItems: 'center', height: "100%", display: "flex", flexDirection: "column" }}>
                        <div id="reporte3Container" className="form" style={{ justifyContent: "center", alignItems: 'center', height: "100%", display: "flex", flexDirection: "column", width: "100%" }}>
                        </div>
                    </div>
                </div>

                <div className="profile-form" style={{ textAlign: "left", backgroundColor: "#0d0c1b", borderRadius: "25px", marginBottom: "5%" }}>
                    <h1>Top 3 productos con menor stock:</h1>
                    <div className="form" style={{ justifyContent: "center", alignItems: 'center', height: "100%", display: "flex", flexDirection: "column" }}>
                        <div id="reporte4Container" className="form" style={{ justifyContent: "center", alignItems: 'center', height: "100%", display: "flex", flexDirection: "column", width: "100%" }}>
                        </div>
                    </div>
                </div>

                <div className="profile-form" style={{ textAlign: "left", backgroundColor: "#0d0c1b", borderRadius: "25px" }}>
                    <h1>Top 3 productos con mayor precio:</h1>
                    <div className="form" style={{ justifyContent: "center", alignItems: 'center', height: "100%", display: "flex", flexDirection: "column" }}>
                        <div id="reporte5Container" className="form" style={{ justifyContent: "center", alignItems: 'center', height: "100%", display: "flex", flexDirection: "column", width: "100%" }}>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default Reportes;
