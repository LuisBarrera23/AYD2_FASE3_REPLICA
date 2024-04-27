import React, { useState, Fragment } from "react";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-h5-audio-player/lib/styles.css";
import { useCookies } from 'react-cookie';


function IngresarProducto() {
    const [nombre, setNombre] = useState("");
    const [description, setDescription] = useState("");
    const [precio, setPrecio] = useState("");
    const [imageBase64, setImageBase64] = useState("");
    const [stock, setStock] = useState("");
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);

    const apiIp = process.env.REACT_APP_API_IP;

    const handlePost = () => {

        const data = {
            nombre: nombre,
            descripcion: description,
            precio: precio,
            image: imageBase64, // Envía la imagen en base64 en lugar del archivo
            stock: stock,
            correo: cookies.usuario.correo
        };

        console.log(data)
        //alert(JSON.stringify(data.image));
        fetch(`${apiIp}:5000/ingresarProducto`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((res) => {
                alert(res.message)
                setNombre("");
                setDescription("");
                setPrecio("");
                setImageBase64("");
                setStock("");
            })
            .catch((error) => console.error(error));
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            // Obtener la imagen en base64
            const base64String = reader.result;
            setImageBase64(base64String);

            
        };
        reader.readAsDataURL(file);
    };

    return (
        <Fragment>
            <section className="home" style={{ display: 'flex', justifyContent: "center", alignItems: "center", paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%", paddingBottom: "5%" }}>
                {/* <div style={{ width: "100%", height:"100%", backgroundColor: "#0d0c1b", justifyContent: "center", overflowY: "auto", borderRadius: "25px" }}> */}
                <div className="profile-form" style={{ textAlign: "left", backgroundColor: "#0d0c1b", overflowY: "auto", borderRadius: "25px", display: "flex", alignItems: "center", flexDirection: "column" }}>

                    <div className="form" style={{ justifyContent: "center", alignItems: 'center' }}>


                        <div className="input-container">
                                <h3>Nombre:</h3>
                                <div className="input-group mb-3">
                                <input
                                        rows="11"
                                        cols="55"
                                        className="form-control"
                                        style={{ color: "black" }}
                                        placeholder="Agrega el nombre del producto"
                                        aria-label="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                />
                                </div>
                        </div>
                        <div className="input-container">
                            <h3>Descripcion:</h3>
                            <div className="input-group mb-3">
                                <textarea
                                    rows="11"
                                    cols="55"
                                    className="form-control"
                                    style={{ color: "black" }}
                                    placeholder="Agrega la descripcion del producto"
                                    aria-label="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </textarea>
                            </div>
                        </div>

                        <div className="input-container">
                                <h3>Precio:</h3>
                                <div className="input-group mb-3">
                                <input
                                        rows="11"
                                        cols="55"
                                        className="form-control"
                                        style={{ color: "black" }}
                                        placeholder="Agrega el precio del producto"
                                        aria-label="precio"
                                        value={precio}
                                        onChange={(e) => setPrecio(e.target.value)}
                                />
                                </div>
                        </div>


                        <div className="input-container">
                                <h3>Stock:</h3>
                                <div className="input-group mb-3">
                                <input
                                        rows="11"
                                        cols="55"
                                        className="form-control"
                                        style={{ color: "black" }}
                                        placeholder="Agrega el stock del producto"
                                        aria-label="stock"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                />
                                </div>
                        </div>

                        <h2>Imagen:</h2>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <input type="file" onChange={handleFileChange} id="fileInput" style={{ display: 'none' }} />
                            <label htmlFor="fileInput" className="btn btn-outline-primary" style={{ cursor: 'pointer' }}>Seleccionar</label>
                        </div>
                        {imageBase64 && (
                            <img
                                src={imageBase64}
                                alt="Imagen de perfil"
                                className="form-image-preview"
                                style={{ width: '200px', height: '200px' }}
                            />
                        )}


                        <div className="d-flex" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <button type="button" className="btn btn-outline-warning" style={{ width: 'auto', height: 'auto', fontSize: "20px" }} onClick={handlePost} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                </svg>
                                {" Agregar"}
                            </button>
                        </div>

                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default IngresarProducto;
