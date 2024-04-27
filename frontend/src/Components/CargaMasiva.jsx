import React, { useState, useRef, Fragment } from "react";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from 'react-cookie';
import "react-h5-audio-player/lib/styles.css";

function CargaMasiva() {
    const [csvFile, setCsvFile] = useState(null); 
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const apiIp = process.env.REACT_APP_API_IP;

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setCsvFile(file);
    };

    const handlePost = () => {
        const formData = new FormData();
        formData.append("file", csvFile); 
        formData.append("correo", cookies.usuario.correo);

        console.log(csvFile);
        fetch(`${apiIp}:5000/uploadCSV`, {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((res) => {
                alert(res.message);
                setCsvFile(null); 
            })
            .catch((error) => console.error(error));
    };

    return (
        <Fragment>
            <section className="home" style={{ display: 'flex', justifyContent: "center", alignItems: "center", paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%", paddingBottom: "5%" }}>
                <div className="profile-form" style={{ textAlign: "left", backgroundColor: "#0d0c1b", overflowY: "auto", borderRadius: "25px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <div className="form" style={{ justifyContent: "center", alignItems: 'center' }}>

                        <br />
                        <br />

                        <div className="input-container">
                            <h3>Carga masiva de Doctores</h3>

                            <br />
                            <br />
                            <br />
                            
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                <input type="file" onChange={handleFileChange} id="fileInput" style={{ display: 'none' }} />
                                <label htmlFor="fileInput" className="btn btn-outline-primary" style={{ cursor: 'pointer' }}>Seleccionar csv</label>
                                {csvFile && <span style={{ marginLeft: '10px' }}>{csvFile.name}</span>}
                            </div>
                        </div>

                        <div className="d-flex" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <button type="button" className="btn btn-outline-warning" style={{ width: 'auto', height: 'auto', fontSize: "20px" }} onClick={handlePost} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                                {" Cargar"}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default CargaMasiva;