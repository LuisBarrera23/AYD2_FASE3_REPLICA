import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import logo from '../Images/Logo.png'
import imagen from '../Images/imagen1.jpg'
import ForgotPassword from "./ForgotPassword";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [forgotPassword, setForgotPassword] = useState(false);
    const [cookies, setCookie] = useCookies(['usuario']);
    const navigate = useNavigate();
    const apiIp = process.env.REACT_APP_API_IP;
    const textLogin = " Sign in "

    const handleLogin = () => {
        if (password !== "" && email !== "") {
            const data = {
                correo: email,
                password: password
            }
            fetch(`${apiIp}:5000/login`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    // console.log(res)
                    if (res.success) {
                        const dataUser = res.user;
                        alert(`Welcome: ${dataUser.username}`)
                        setCookie('usuario', dataUser);
                        // localStorage.setItem('photo', res.photo);
                        if (dataUser.rol === 0) {
                            navigate('/admin')
                        } else if (dataUser.rol === 1) {
                            navigate('/doctor')
                        } else if (dataUser.rol === 2) {
                            navigate(`/homepaciente`);
                        }
                    } else {
                        alert(`Email and/or password incorrect.`)
                    }
                    setEmail("")
                    setPassword("")
                })
                .catch((error) => console.error(error));
        } else {
            alert(`Please fill out the fields.`)
        }
    };

    const handleForgotPassword = (value) => {
        setPassword("");
        setEmail("");
        setForgotPassword(value);
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
                                src={logo}
                                alt="Centered"
                                className="centered-image"
                                width='350px'
                                height='350px'
                            />
                        </div>

                        {
                            forgotPassword ?
                                (
                                    <ForgotPassword handleForgotPassword={handleForgotPassword} />
                                ) :
                                (
                                    <div className="form">
                                        <div className="input-container">
                                            <h3>Email</h3>
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
                                        <div className="d-flex" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                                            <button type="button" className="btn btn-outline-warning buttons-camera" onClick={() => handleForgotPassword(true)}>Forgot password?</button>
                                            <button
                                                type="button"
                                                onClick={handleLogin}
                                                className="btn btn-outline-info"
                                                style={{ width: 'auto', height: 'auto' }}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
                                                    <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                                                </svg>
                                                {textLogin}
                                            </button>
                                        </div>
                                        <div style={{ fontSize: "12px", marginTop: "5%" }}>
                                            Don't have an account? <Link to="/signup">Sign up here</Link>.
                                        </div>
                                    </div>
                                )
                        }

                    </div>
                </div >
            </div >
            {/*FIN FORM*/}
        </div >
    );
};

export default Login;
