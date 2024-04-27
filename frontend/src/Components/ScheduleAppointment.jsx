import React, { useState, useRef, useEffect, Fragment } from "react";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from 'react-cookie';
import "react-h5-audio-player/lib/styles.css";

function ScheduleAppointment(props) {
    const [description, setDescription] = useState("");
    const [appointment, setAppointment] = useState("");
    const isInitialMount = useRef(true);
    const apiIp = process.env.REACT_APP_API_IP;

    const handleSchedule = () => {
        if(description === "" || appointment === ""){
            alert("You must add a description and/or select a date to schedule an appointment.")
            return;
        }
        const data = {
            id_user: props.id_user,
            descripcion: description,
            fecha: appointment
        }

        console.log(data)

        fetch(`${apiIp}:5000/addCita`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((res) => {
                if (res.success) {
                    alert("Your appointment was successfully scheduled!");
                } else {
                    alert("There was a problem scheduling your appointment, please try again.")
                }
                setDescription("");
                setAppointment("");
            })
            .catch((error) => console.error(error));
    };

    return (
        <Fragment>
            <section className="home" style={{ display: 'flex', justifyContent: "center", alignItems: "center", paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%", paddingBottom: "5%" }}>
                {/* <div style={{ width: "100%", height:"100%", backgroundColor: "#0d0c1b", justifyContent: "center", overflowY: "auto", borderRadius: "25px" }}> */}
                <div className="profile-form" style={{ textAlign: "left", backgroundColor: "#0d0c1b", overflowY: "auto", borderRadius: "25px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <h1>Schedule appointment</h1>
                    <div className="form" style={{ justifyContent: "center", alignItems: 'center', height: "100%", display: "flex", flexDirection: "column" }}>
                        <div className="input-container">
                            <h4>Description of the illness:</h4>
                            <div className="input-group mb-3">
                                <textarea
                                    id="inputcita"
                                    rows="5"
                                    cols="55"
                                    className="form-control"
                                    style={{ color: "black" }}
                                    placeholder="Tell us what illnesses you are experiencing"
                                    aria-label="Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                >
                                </textarea>
                            </div>
                            <h4>Choose a date:</h4>
                            <div className="input-group mb-3">
                                <input
                                    id="inputdate"
                                    type="date"
                                    required
                                    className="form-control"
                                    style={{ color: "black" }}
                                    placeholder="Birthdate"
                                    aria-label="Birthdate"
                                    value={appointment}
                                    // min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setAppointment(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="d-flex" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <button id="btnaddcita" type="button" className="btn btn-outline-warning" style={{ width: 'auto', height: 'auto', fontSize: "20px", display: "flex", alignItems: "center", justifyContent: "center" }} onClick={handleSchedule} >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-calendar-check" viewBox="0 0 16 16">
                                    <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0" />
                                    <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                                </svg>
                                <span style={{ marginLeft: "10px" }}>{" Schedule"}</span>

                            </button>
                        </div>

                    </div>
                </div>
            </section>
        </Fragment>
    );
};

export default ScheduleAppointment;
