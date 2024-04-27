import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from '../Images/Logo.png'
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";
import imagen from '../Images/imagen2.jpg'
import { useCookies } from 'react-cookie';

function Signup() {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [gender, setGender] = useState("");
    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [password, setPassword] = useState("");
    const [selectedImage, setSelectedImage] = useState(null);
    const [base64Image, setBase64Image] = useState('');

    const navigate = useNavigate();
    const apiIp = process.env.REACT_APP_API_IP;

    const handleSignup = (event) => {
        event.preventDefault();
        if (base64Image) {
            const data = {
                nombre: name,
                apellido: lastName,
                fecha_nac: birthdate,
                sexo: gender,
                username: username,
                correo: email,
                password: password,
                image: base64Image,
                rol: "2"
            }
            console.log(data)

            fetch(`${apiIp}:5000/adduser`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    console.log(res)

                    if (res.success === true) {
                        alert(`${res.message}`)
                        setName("")
                        setUserName("")
                        setEmail("")
                        setAge("")
                        setPassword("")
                        // Borrar esta linea cuando ya se tenga el endpoint
                        localStorage.setItem("image", base64Image);
                        setBase64Image("")
                        navigate(`/`);
                    } else {
                        alert(res.message)
                    }
                })
                .catch((error) => console.error(error));
        } else {
            alert("You must upload a profile image.");
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(URL.createObjectURL(file));
                setBase64Image(reader.result);
                console.log(reader.result)
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="contenedor">
            <div className="imagenDiv">
                <img
                    src={imagen}
                    alt="Imagen"
                    className="imagen"
                />
            </div>
            {/*FORM*/}
            <div className="formularioDiv" style={{ overflowY: "auto" }}>
                <div className="App2">
                    <div className="login-form">
                        <div className="centered-container">
                            <img
                                src={logo} // Cambia la ruta de la imagen
                                alt="Centered"
                                className="centered-image"
                                width='250px'
                                height='250px'
                            />
                        </div>

                        <form onSubmit={handleSignup}>
                            <div className="form">
                                <div className="input-container">
                                    <h3>Name</h3>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            style={{ color: "black" }}
                                            placeholder="Enter your name"
                                            aria-label="Name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="input-container">
                                    <h3>Last Name</h3>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            style={{ color: "black" }}
                                            placeholder="Enter your last name"
                                            aria-label="Last name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="input-container">
                                    <h3>Username</h3>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            style={{ color: "black" }}
                                            placeholder="Enter your username"
                                            aria-label="Username"
                                            value={username}
                                            onChange={(e) => setUserName(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="input-container" >
                                    <h3>Email address</h3>
                                    <div className="input-group mb-3">
                                        <input
                                            type="email"
                                            required
                                            className="form-control"
                                            style={{ color: "black" }}
                                            placeholder="Enter email"
                                            aria-label="Email address"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div className="input-container">
                                    <h3>Gender</h3>
                                    <div className="input-group mb-3">
                                        <select
                                            required
                                            className="form-select"
                                            style={{ color: "black" }}
                                            aria-label="Gender"
                                            value={gender}
                                            onChange={(e) => setGender(e.target.value)}
                                        >
                                            <option value="">Select Gender</option>
                                            <option value="M">Male</option>
                                            <option value="F">Female</option>
                                        </select>
                                    </div>
                                </div>


                                <div className="input-container">
                                    <h3>Birthdate</h3>
                                    <div className="input-group mb-3">
                                        <input
                                            type="date"
                                            required
                                            className="form-control"
                                            style={{ color: "black" }}
                                            placeholder="Birthdate"
                                            aria-label="Birthdate"
                                            value={birthdate}
                                            onChange={(e) => setBirthdate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="input-container">
                                    <h3>Password</h3>
                                    <div className="input-group mb-3">
                                        <input
                                            type="password"
                                            required
                                            className="form-control"
                                            style={{ color: "black" }}
                                            placeholder="Password"
                                            aria-label="Password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Boton de cargar imagen */}
                                <div className="input-container" style={{ marginBottom: "7%" }}>
                                    <label htmlFor="file-upload" className="btn btn-outline-warning" style={{ fontSize: "19px", width: "auto", height: "auto" }}>
                                        Upload User Photo
                                    </label>
                                    <input onChange={handleImageChange} id="file-upload" type="file" accept="image/*" />
                                </div>
                                {selectedImage && <img src={selectedImage} alt="Selected" style={{ maxWidth: '150px', maxHeight: '150px', marginBottom: "7%" }} />}

                                <div style={{ fontSize: "12px" }}>
                                    You already have an account? <Link to="/">Sign in here</Link>.
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-outline-light"
                                    style={{ marginTop: "5%", width: 'auto' }}
                                >
                                    Sign Up
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            {/*FIN FORM*/}
        </div>
    );
}
export default Signup;