import React, { useState, useRef, useEffect, Fragment } from "react";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from 'react-cookie';
import "react-h5-audio-player/lib/styles.css";

function Profile() {

    const [cookies, setCookie] = useCookies(['usuario']);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [email, setEmail] = useState("");
    const [genre, setGenre] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [foto, setFoto] = useState("");
    const [selectedImage, setSelectedImage] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
    const [base64Image, setBase64Image] = useState('');
    const isInitialMount = useRef(true);
    const apiIp = process.env.REACT_APP_API_IP;

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
        const dataUser = cookies.usuario;
        console.log(dataUser)
        setFirstName(dataUser.nombre);
        setLastName(dataUser.apellido);
        setUsername(dataUser.username);
        setEmail(dataUser.correo);
        setFoto(dataUser.image);

        const fecha = new Date(dataUser.fecha_nac);
        const formattedDate = fecha.toISOString().split('T')[0];

        // const dia = fecha.getDate();
        // const mes = fecha.getMonth() + 1;
        // const anio = fecha.getFullYear();
        // const fechaFormateada = `${dia}/${mes}/${anio}`;
        setBirthDate(formattedDate);

        if (dataUser.sexo === 'M') {
            setGenre("Masculino");
        } else {
            setGenre("Femenino");
        }
    }, []);

    const handleUpdate = (event) => {
        event.preventDefault();
        const dataUser = cookies.usuario;
        let imagen = "";
        let cambio = false; 

        if (base64Image === '') {
            imagen = foto;
        } else {
            imagen = base64Image;
            cambio = true
        }

        alert(cambio)

        const data = {
            id_user: dataUser.id_user,
            nombre: firstName,
            apellido: lastName,
            username: username,
            correo: email,
            fecha_nac: birthDate,
            sexo: dataUser.sexo,
            newPassword: newPassword,
            currentPassword: currentPassword,
            image: imagen,
            imageBool: cambio 
        }
        console.log(data)

        fetch(`${apiIp}:5000/updateUser`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                // console.log(res)
                if (res.success === true) {
                    const newDataUser = res.user;
                    setCookie('usuario', newDataUser);
                    setNewPassword("");
                    setCurrentPassword("");
                    setFoto(res.user.image);
                    setSelectedImage('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
                    setBase64Image('');
                    alert(res.message);
                } else {
                    alert(res.message);
                    setFirstName(dataUser.nombre);
                    setLastName(dataUser.apellido);
                    setUsername(dataUser.username);

                    const fecha = new Date(dataUser.fecha_nac);
                    const formattedDate = fecha.toISOString().split('T')[0];
                    setBirthDate(formattedDate);
                    setNewPassword("");
                    setCurrentPassword("");
                    // Imagen que se obtiene de dataUser.image
                    const image = localStorage.getItem("image");
                    setFoto(image);
                    setSelectedImage('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png');
                    setBase64Image('');
                }
            })
            .catch((error) => console.error(error));
    };

    const handleImageChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setSelectedImage(URL.createObjectURL(file));
                setBase64Image(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <Fragment>
            <section className="home" style={{ display: 'flex', justifyContent: "center", alignItems: "center", paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%", paddingBottom: "5%" }}>
                <div style={{ width: "100%", height: "100%", backgroundColor: "#0d0c1b", justifyContent: "center", overflowY: "auto", borderRadius: "25px" }}>
                    <div className="profile-form" style={{ textAlign: "left", height: "auto" }}>
                        <div className="centered-container" style={{ display: "flex", justifyContent: "center", marginBottom: "5%", maxHeight: "30rem", alignItems: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", maxHeight: "30rem", maxWidth: "20rem" }}>
                                {foto && (
                                    <img src={foto} alt="Profile Image" className="profile-user-image2" style={{ borderRadius: "50%", objectFit: "cover" }} />
                                )}
                            </div>
                        </div>
                        <form onSubmit={handleUpdate}>
                            <div className="form">
                                <div className="input-container">
                                    <h3>First Name:</h3>
                                    <div className="input-group mb-3">
                                        <input
                                            id="inputfullname"
                                            type="text"
                                            required
                                            className="form-control"
                                            style={{ color: "black" }}
                                            placeholder="Enter your Full Name"
                                            aria-label="First Name"
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                        // disabled
                                        />
                                    </div>
                                </div>
                                <div className="input-container">
                                    <h3>Last Name:</h3>
                                    <div className="input-group mb-3">
                                        <input
                                            id="inputlastname"
                                            type="text"
                                            required
                                            className="form-control"
                                            style={{ color: "black" }}
                                            placeholder="Enter your Full Name"
                                            aria-label="First Name"
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                        // disabled
                                        />
                                    </div>
                                </div>
                                <div className="input-container">
                                    <h3>Username:</h3>
                                    <div className="input-group mb-3">
                                        <input
                                            id="inputusername"
                                            type="text"
                                            required
                                            className="form-control"
                                            style={{ color: "black" }}
                                            placeholder="Enter your username"
                                            aria-label="First Name"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        // disabled
                                        />
                                    </div>
                                </div>
                                <div className="input-container">
                                    <h3>Email:</h3>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            style={{ color: "black" }}
                                            placeholder="Enter your email"
                                            aria-label="First Name"
                                            value={email}
                                            disabled
                                        />
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
                                            value={birthDate}
                                            onChange={(e) => setBirthDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="input-container">
                                    <h3>Genre:</h3>
                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            required
                                            className="form-control"
                                            style={{ color: "black" }}
                                            placeholder="Enter your specialty"
                                            aria-label="Specialty"
                                            value={genre}
                                            disabled
                                        />
                                    </div>
                                </div>
                                <div className="input-container">
                                    <h3>New Password:</h3>
                                    <div className="input-group mb-3">
                                        <input
                                            id="inputnewpassword"
                                            type="password"
                                            required
                                            className="form-control"
                                            style={{ color: "black" }}
                                            placeholder="New password"
                                            aria-label="New password"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="input-container">
                                    <h3>Confirm Current Password:</h3>
                                    <div className="input-group mb-3">
                                        <input
                                            id="inputpassword"
                                            type="password"
                                            required
                                            className="form-control"
                                            style={{ color: "black" }}
                                            placeholder="Current password"
                                            aria-label="Current password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <div style={{ display: "flex", justifyContent: "center", alignContent: "center", marginTop: "5%" }}>
                                    <label htmlFor="file-upload" className="btn btn-outline-info" style={{ fontSize: "19px", width: "100%", height: "auto", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-square" viewBox="0 0 16 16" style={{ marginRight: "1%" }}>
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                                            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                                        </svg>
                                        {" User image"}
                                    </label>
                                    <input onChange={handleImageChange} id="file-upload" type="file" accept="image/*" />
                                </div>
                                <div className="centered-container" style={{ display: "flex", justifyContent: "center", marginTop: "5%", maxHeight: "30rem", alignItems: "center" }}>
                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", maxHeight: "30rem", maxWidth: "15rem" }}>
                                        {selectedImage && <img src={selectedImage} className="profile-user-image" alt="Selected" style={{ borderRadius: "50%", objectFit: "cover" }} />}
                                    </div>
                                </div>

                                <div style={{ textAlign: "center", marginTop: "5%" }} className="input-container">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-warning"
                                        style={{ fontSize: "20px", width: "auto", height: "auto" }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                                            <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41m-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9" />
                                            <path fillRule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5 5 0 0 0 8 3M3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9z" />
                                        </svg>
                                        {" Update"}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

            </section>
        </Fragment>
    );
};

export default Profile;