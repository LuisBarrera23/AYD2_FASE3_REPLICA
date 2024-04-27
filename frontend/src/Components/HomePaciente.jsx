import React, { useState, Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Styles/styles.css";
import "./Styles/Sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import ScheduleAppointment from "./ScheduleAppointment";
import Profile from "./Profile";
import Products from "./Products"
import History from "./History";
import ComprasHistorial from "./ComprasHistorial";
import Carrito from "./carritofinal"
import ShoppingCartOverlay from "./shopping";

function HomePaciente() {
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const [indexOptions, setIndexOptions] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);
    const navigate = useNavigate();
    const isInitialMount = useRef(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const apiIp = process.env.REACT_APP_API_IP;
    const [products, setProducts] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        const isProductInCart = cartItems.some(item => item.id_product === product.id_product);
    
        if (!isProductInCart) {
            const newProduct = { ...product, quantity: 1 };
            setCartItems([...cartItems, newProduct]);
            console.log(cartItems)
        } else {
            alert("Este producto ya está en tu carrito");
        }
    };
    

    const handleToggleClick = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('close');
    };

    const handleToggleSwitchClick = () => {
        document.body.classList.toggle('dark', !isDarkMode);
        setIsDarkMode(!isDarkMode);
    };

    const handleSetCartItems = (updatedCartItems) => {
        setCartItems(updatedCartItems);
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (indexOptions === 1) {
            // getUsers();
            setIndexOptions(1);
        }

    }, [refreshKey]);

    const handleSignOut = () => {
        removeCookie('usuario');
        navigate("/");
    };

    const handleRefresh = () => {
        // Incrementa refreshKey para forzar una actualización de renderizado
        setRefreshKey((refreshKey) => refreshKey + 1);
    };

    const handleCartToggle = () => {
        setIsCartOpen(!isCartOpen);
    };

    let contentToRender = null;

    const getProducts = () => {
        fetch(`${apiIp}:5000/products/${cookies.usuario.id_user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                setProducts(res.products);
                setIndexOptions(2);
            })
            .catch((error) => console.error(error));
    };

    if (indexOptions === 0) {
        contentToRender = (
            <Profile />
        );
    } else if (indexOptions === 1) {
        contentToRender = (
            <ScheduleAppointment id_user={cookies.usuario.id_user} />
        );
    }
    else if (indexOptions === 2) {
        contentToRender = (
            
                
            <section className="home" style={{ overflowY: "auto", padding: "5%" }}>
                <button className={`fixed-button cart-toggle-button ${isCartOpen ? 'clicked' : ''}`} onClick={handleCartToggle}>
                    {isCartOpen ? (
                        <i className="bx bx-x icon"></i> // Cambiar al icono de X cuando el carrito esté abierto
                    ) : (
                        <i className="bx bx-shopping-bag icon"></i> // Usar el icono de bolsa de compras por defecto
                    )}
                </button>
                {isCartOpen && <ShoppingCartOverlay isOpen={isCartOpen} cartItems={cartItems} setCartItems={handleSetCartItems} setindex={setIndexOptions} /> }
            
                <Products title="Our products:" lista={products} onAddToCart={addToCart} index={1} id_usuario={cookies.usuario.id_user} onRefresh={handleRefresh} />
            </section>
        );
    } else if (indexOptions === 3) {
        contentToRender = (
            <History id_user={cookies.usuario.id_user} />
        );
    } else if (indexOptions === 4) {
        contentToRender = (
            <Carrito cartItems={cartItems} />
        );
    } else if (indexOptions === 5) {
        contentToRender = (
            <ComprasHistorial id_user={cookies.usuario.id_user} />
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
                                    <span className="text nav-text">Profile</span>
                                </Link>
                            </li>
                            <li id="navegar_cita" className="nav-link">
                                <Link onClick={() => setIndexOptions(1)}>
                                    <i className='bx bx-calendar-event icon'></i>
                                    <span className="text nav-text">Schedule appointment</span>
                                </Link>
                            </li>

                            <li  id="navegar_compra"  className="nav-link">
                                <Link onClick={getProducts}>
                                    <i className='bx bx-shopping-bag icon' ></i>
                                    <span className="text nav-text">Buy products</span>
                                </Link>
                            </li>

                            <li  id="navegar_historialcita" className="nav-link">
                                <Link onClick={() => setIndexOptions(3)}>
                                    <i className='bx bx-history icon' ></i>
                                    <span className="text nav-text">Appointment history</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link onClick={() => setIndexOptions(5)}>
                                    <i className='bx bx-history icon' ></i>
                                    <span className="text nav-text">Shopping history</span>
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

export default HomePaciente;
