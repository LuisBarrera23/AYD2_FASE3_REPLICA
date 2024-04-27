import React, { useState, Fragment, } from "react";
import { Link } from "react-router-dom";
import "./Styles/styles.css";
import "./Styles/Sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";



import IngresarProducto from "./ingresarProducto";
import CargaMasiva from "./CargaMasiva";
import EliminarDoctor from "./EliminarDoctor";
import EliminarUsuario from "./EliminarUsuario";
import CargaMasiva2 from "./CargaMasiva2";
import Reportes from "./Reportes";
import Bitacora from "./Bitacora";

function Admin() {

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
            <CargaMasiva />
        );
    } else if (indexOptions === 1) {
        contentToRender = (
            <EliminarDoctor />
        );
    } else if (indexOptions === 2) {
        contentToRender = (
            <EliminarUsuario />
        );
    } else if (indexOptions === 3) {
        contentToRender = (
            <IngresarProducto />
        );
    } else if (indexOptions === 4) {
        contentToRender = (
            <CargaMasiva2 />
        );
    } else if (indexOptions === 5) {
        contentToRender = (
            <Reportes />
        );
    } else if (indexOptions === 6) {
        contentToRender = (
            <Bitacora />
        );
    }

    return (
        <Fragment>
            <nav className="sidebar close">
                <header>
                    <div className="image-text">
                        <span className="image">
                            <div style={{ backgroundColor: "#3D6CFF", height: "40px", width: "40px", borderRadius: "6px", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bolder" }}>
                                MC
                            </div>
                        </span>

                        <div className="text logo-text">
                            <span className="name">Med Connection</span>
                            <span className="profession">G9</span>
                        </div>
                    </div>

                    <i className='bx bx-chevron-right toggle' onClick={handleToggleClick}></i>
                </header>
                <hr className="horizontal light mt-10 mb-0" />
                <div className="menu-bar">
                    <div className="menu">
                        <ul className="menu-links" >
                            <li className="nav-link" id="navegar_cargaD">
                                <Link onClick={() => setIndexOptions(0)}>
                                    <i className='bx bx-plus-medical icon' ></i>
                                    <span className="text nav-text">Cargar doctores</span>
                                </Link>
                            </li>

                            <li className="nav-link" id="navegar_deleteD">
                                <Link onClick={() => setIndexOptions(1)}>
                                    <i className='bx bx-trash icon'></i>
                                    <span className="text nav-text">Eliminar Doctor</span>
                                </Link>
                            </li>
                            <li id="navegar_deleteP" className="nav-link">
                                <Link onClick={() => setIndexOptions(2)}>
                                    <i className='bx bx-trash-alt icon' ></i>
                                    <span className="text nav-text">Eliminar Usuario</span>
                                </Link>
                            </li>

                            <li  id="navegar_addProducto" className="nav-link">
                                <Link onClick={() => setIndexOptions(3)}>
                                    <i className='bx bxs-cart-add icon' ></i>
                                    <span className="text nav-text">Ingresar Producto</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link onClick={() => setIndexOptions(4)}>
                                    <i className='bx bxs-capsule icon' ></i>
                                    <span className="text nav-text">Carga Productos</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link onClick={() => setIndexOptions(5)}>
                                    <i class='bx bxs-report icon'></i>
                                    <span className="text nav-text">Reportes</span>
                                </Link>
                            </li>
                            <li className="nav-link">
                                <Link onClick={() => setIndexOptions(6)}>
                                    <i class='bx bxs-report icon'></i>
                                    <span className="text nav-text">Bitácora</span>
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

                            <div className="toggle-switch" onClick={handleToggleSwitchClick}>
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

export default Admin;
