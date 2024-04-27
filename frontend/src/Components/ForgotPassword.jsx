import React, { useState } from "react";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-modal";

function ForgotPassword(props) {
    const [email, setEmail] = useState("");
    const [modalIsOpen, setModalIsOpen] = useState(false); // Nuevo estado para el modal

    const apiIp = process.env.REACT_APP_API_IP;
    const textForgotPassword = " Reset password ";
    const [code, setCode] = useState("");
    const [newpass, setNewpass] = useState("");

    const handleResetPassword = () => {
        if (email !== "") {
            const data = {
                correo: email,
            };

            fetch(`${apiIp}:5000/forgotPassword`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.message === "A verification code has been sent to your email") {
                        // Si la respuesta es la esperada, abrir el modal
                        setModalIsOpen(true);
                        console.log("")
                    } else {
                        alert("Error: " + res.message); // Muestra un mensaje de error en caso contrario
                    }
                })
                .catch((error) => console.error(error));
        } else {
            alert("Please enter your email.");
        }
    };

    const handleForgotPassword = () => {
        props.handleForgotPassword(false);
    };


    const handleCloseModal = () => {
        setModalIsOpen(false);
    };

    const handleSubmit = async() => {
        try {
            const response = await fetch(`${apiIp}:5000/confirmPasswordReset`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    correo: email, 
                    verificationCode: code,
                    newPassword: newpass,
                }),
            });
    
            if (response.ok) {
                const result = await response.json();
                alert(result.message)
                console.log(result);
                
            } else {
                const result = await response.json();
                alert(result.message)
                console.error('Error en la solicitud al servidor', result);
            }
        } catch (error) {
            console.error('Error en la solicitud fetch', error);
        }    
        setNewpass("")
        setCode("")
        handleCloseModal();
    };

    return (
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
            <div className="d-flex" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                <button type="button" className="btn btn-outline-danger buttons-camera" onClick={handleForgotPassword} >Back</button>
                <button
                    type="button"
                    onClick={handleResetPassword}
                    className="btn btn-outline-success"
                    style={{ width: 'auto', height: 'auto' }}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-key" viewBox="0 0 16 16">
                        <path d="M0 8a4 4 0 0 1 7.465-2H14a.5.5 0 0 1 .354.146l1.5 1.5a.5.5 0 0 1 0 .708l-1.5 1.5a.5.5 0 0 1-.708 0L13 9.207l-.646.647a.5.5 0 0 1-.708 0L11 9.207l-.646.647a.5.5 0 0 1-.708 0L9 9.207l-.646.647A.5.5 0 0 1 8 10h-.535A4 4 0 0 1 0 8m4-3a3 3 0 1 0 2.712 4.285A.5.5 0 0 1 7.163 9h.63l.853-.854a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.646-.647a.5.5 0 0 1 .708 0l.646.647.793-.793-1-1h-6.63a.5.5 0 0 1-.451-.285A3 3 0 0 0 4 5" />
                        <path d="M4 8a1 1 0 1 1-2 0 1 1 0 0 1 2 0" />
                    </svg>
                    {textForgotPassword}
                </button>
            </div>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={handleCloseModal}
                contentLabel="Enter the code"
                ariaHideApp={false}
                className="custom-modal" // Agrega una clase personalizada para el modal
                overlayClassName="custom-overlay" // Agrega una clase personalizada para el overlay
            >
                <div className="custom-modal-content">
                    <div className="custom-modal-header">
                        <h5 className="custom-modal-title">Enter the code and reset password</h5>
                        <button className="custom-modal-close" onClick={handleCloseModal}>
                            &times;
                        </button>
                    </div>
                    <div className="custom-modal-padding">
                        <div>
                            <label htmlFor="codeInput">Code:</label>
                            <input
                                type="text"
                                id="codeInput"
                                className="form-control"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <label htmlFor="passInput">New Password:</label>
                            <input
                                type="text"
                                id="passInput"
                                className="form-control"
                                value={newpass}
                                onChange={(e) => setNewpass(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer d-flex justify-content-between">

                            <button type="button" className="btn btn-outline-primary " onClick={handleSubmit}>
                                Send
                            </button>
                            <button type="button" className="btn btn-outline-danger btn-sm mt-3" onClick={handleCloseModal}>
                                Cancel
                            </button>

                        </div>
                    </div>
                </div>
            </Modal>


        </div>
    );
};

export default ForgotPassword;
