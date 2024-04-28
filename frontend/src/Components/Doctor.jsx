import React, { useState, Fragment, } from "react";
import { Link } from "react-router-dom";
import "./Styles/styles.css";
import "./Styles/Sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";

import Profile from "./Profile";
import ListaCitas from "./Dlistacitas";
import HistorialCitas from "./Dhistorialcitas";
import EditProducts from "./EditProducts";

function Doctor() {

    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const [indexOptions, setIndexOptions] = useState(0);
    const navigate = useNavigate();
    const [isDarkMode, setIsDarkMode] = useState(false);



    const handleToggleClick = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('close');
    };

    const handleToggleSwitchClick = () => {
        document.body.classList.toggle('dark', !isDarkMode);
        setIsDarkMode(!isDarkMode);
    };


    const handleSignOut = () => {
        removeCookie('usuario');
        removeCookie('peopleList');
        navigate("/");
    };



    let contentToRender = null;


    if (indexOptions === 0) {
        contentToRender = (
            <Profile />
        );
    } else if (indexOptions === 1) {
        contentToRender = (
            <ListaCitas />
        );
    } else if (indexOptions === 2) {
        contentToRender = (
            <HistorialCitas />
        );
    } else if (indexOptions === 3) {
        contentToRender = (
            <EditProducts />
        );
    }
    return (
        <Fragment>
            <nav className="sidebar close">
                <header>
                    <div className="image-text">
                        <span className="image">
                            <div style={{ backgroundColor: "#3D6CFF", height: "40px", width: "40px", borderRadius: "6px", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bolder" }}>
                                GT-H
                            </div>
                        </span>

                        <div className="text logo-text">
                            <span className="name">GT Hospital</span>
                            <span className="profession">G4</span>
                        </div>
                    </div>

                    <i className='bx bx-chevron-right toggle' onClick={handleToggleClick}></i>
                </header>
                <hr className="horizontal light mt-10 mb-0" />
                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu-links">
                            <li className="nav-link">
                                <Link onClick={() => setIndexOptions(0)}>
                                    <i className='bx bx-user-circle icon'></i>
                                    <span className="text nav-text">Perfil</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link id="navegar_atender" onClick={() => setIndexOptions(1)}>
                                    <i className='bx bx-calendar-x icon'></i>
                                    <span className="text nav-text">Atender Citas</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link id="navegar_atenderFinal" onClick={() => setIndexOptions(2)}>
                                    <i className='bx bx-calendar-heart icon'></i>
                                    <span className="text nav-text">Historial de Citas</span>
                                </Link>
                            </li>
                            <li id="navegar_updateP" className="nav-link">
                                <Link onClick={() => setIndexOptions(3)}>
                                <i className='bx bxs-edit icon'></i>
                                    <span className="text nav-text">Editar productos</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="bottom-content">
                        <li className="">
                            <Link to="/" onClick={handleSignOut}>
                                <i className='bx bx-log-out icon' ></i>
                                <span className="text nav-text">Logout</span>
                            </Link>
                        </li>

                        <li className="mode">
                            <div className="sun-moon">
                                <i className='bx bx-moon icon moon'></i>
                                <i className='bx bx-sun icon sun'></i>
                            </div>
                            <span className="mode-text text">Dark mode</span>

                            <div   id="switch_dark" className="toggle-switch" onClick={handleToggleSwitchClick}>
                                <span className="switch"></span>
                            </div>
                        </li>

                    </div>
                </div>

            </nav>
            {
                contentToRender
            }

        </Fragment>
    );
};

export default Doctor;
