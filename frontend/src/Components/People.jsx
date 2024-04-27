import React, { Fragment, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function People(props) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [commonFriends, setCommonFriends] = useState([]);
    const isInitialMount = useRef(true);
    const apiIp = process.env.REACT_APP_API_IP;

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }
    }, []);

    const handleSeeProfile = (key) => {
        props.handleEmail(key)
    };

    const handleAddFriend = (key) => {
        const data = {
            userEmail: props.correo,
            friendEmail: key
        }

        fetch(`${apiIp}:8080/addFriend`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((res) => {
                alert(res.message)
                props.onRefresh();
            })
            .catch((error) => console.error(error));
    };

    const openModal = (commonFriends) => {
        setCommonFriends(commonFriends);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setCommonFriends([]);
    }

    return (
        <div style={{ marginBottom: "5%" }}>
            <div className="text" style={{ marginBottom: "2rem", padding: "0", fontSize: "3rem", fontWeight: "bolder" }}>
                {props.title}
            </div>
            <div className="container text-center">
                <div className="row row-cols-1 row-cols-lg-4 g-2 g-lg-3">
                    {
                        props.index === 1 && (

                            props.lista.map((user) => (
                                <div className="col" style={{ height: '100%' }} key={user.id}>
                                    <div className="p-3" style={{ height: '100%' }}>
                                        <div className="profile-card" style={{ textAlign: "left", backgroundColor: "#0d0c1b", borderRadius: "10px", display: "flex", flexDirection: "column", padding: "0%" }}>
                                            <div onClick={() => openModal(user.comun_amigos)} className="centered-container" style={{ display: "flex", justifyContent: "center", maxHeight: "11rem", alignItems: "center", overflowX: "auto" }}>
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", maxHeight: "10rem", maxWidth: "5rem" }}>
                                                    <img src={user.photo} className="people-user-image" alt="Selected" style={{ objectFit: "cover" }} />
                                                </div>
                                            </div>

                                            <div style={{ height: "50%", maxWidth: "100%", margin: "0%", padding: "0%", backgroundColor: "white", borderBottomLeftRadius: '10px', borderBottomRightRadius: "10px", overflowY: "auto" }}>
                                                <div className="input-container" style={{ textAlign: "center", color: "black", maxHeight: "8vh", marginBottom: "0px", overflowY: "auto" }}>
                                                    <h5 title={user.fullname}>{user.fullname}</h5>
                                                </div>
                                                <div className="d-flex" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", maxWidth: "100%" }}>
                                                    <button type="button" className="btn btn-outline-primary" style={{ width: '80%', height: 'auto', fontSize: "20px", marginBottom: "3%", overflow: "auto" }} onClick={() => handleSeeProfile(user.email)}>
                                                        Profile
                                                    </button>
                                                    <button type="button" className="btn btn-outline-success" style={{ width: '80%', height: 'auto', fontSize: "20px", overflow: "auto" }} onClick={() => handleAddFriend(user.email)}>
                                                        Add friend
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                    {
                        props.index === 2 && (
                            props.lista.map((user) => (
                                <div className="col" style={{ height: '100%' }} key={user.id}>
                                    <div className="p-3" style={{ height: '100%' }}>
                                        <div className="profile-card" style={{ textAlign: "left", backgroundColor: "#0d0c1b", borderRadius: "10px", display: "flex", flexDirection: "column", padding: "0%" }}>
                                            <div className="centered-container" style={{ display: "flex", justifyContent: "center", maxHeight: "11rem", alignItems: "center", overflowX: "auto" }}>
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", maxHeight: "10rem", maxWidth: "5rem" }}>
                                                    <img src={user.photo} className="people-user-image" alt="Selected" style={{ objectFit: "cover" }} />
                                                </div>
                                            </div>


                                            <div style={{ height: "50%", maxWidth: "100%", margin: "0%", padding: "0%", backgroundColor: "white", borderBottomLeftRadius: '10px', borderBottomRightRadius: "10px" }}>
                                                <div className="input-container" style={{ textAlign: "center", color: "black", maxHeight: "8vh", marginBottom: "0px" }}>
                                                    <h5 title={user.fullname}>{user.fullname}</h5>
                                                </div>
                                                <div className="d-flex" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", maxWidth: "100%" }}>
                                                    <button type="button" className="btn btn-outline-primary" style={{ width: '80%', height: 'auto', fontSize: "20px", marginBottom: "3%", overflow: "auto" }} onClick={() => handleSeeProfile(user.email)}>
                                                        Profile
                                                    </button>
                                                    <button type="button" className="btn btn-outline-success" style={{ width: '80%', height: 'auto', fontSize: "20px", overflow: "auto" }} onClick={() => handleAddFriend(user.email)}>
                                                        Add friend
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div>

            <div className={`modal ${isModalOpen ? 'open' : ''}`}>
                <div className="modal-content">
                    <h3>Common Friends</h3>
                    <ul>
                        {commonFriends.map((friend, index) => (
                            <li key={index}>{friend}</li>
                        ))}
                    </ul>
                    <button onClick={closeModal}>Close</button>
                </div>

            </div>
        </div >
    );
};

export default People;