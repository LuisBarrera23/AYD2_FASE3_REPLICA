import React, { useState, Fragment, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Styles/styles.css";
import "./Styles/Sidebar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
// import Users from "./Users";
// import CreatePost from "./CreatePost";
import Profile from "./Profile";
import { Posts } from "./Posts";
import Search from "./Search";
// import FriendProfile from "./FriendProfile";
import Consultas from "./consultas";
function Home() {

    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const [indexOptions, setIndexOptions] = useState(0);
    const [refreshKey, setRefreshKey] = useState(0);
    const navigate = useNavigate();
    const isInitialMount = useRef(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const apiIp = process.env.REACT_APP_API_IP;
    const [people, setPeople] = useState([]);
    const [friends, setFriends] = useState([])
    const [chatFriends, setChatFriends] = useState([])
    const [postList, setPostList] = useState([]);
    const [friendEmail, setFriendEmail] = useState("");

    const handleToggleClick = () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('close');
    };

    const handleToggleSwitchClick = () => {
        document.body.classList.toggle('dark', !isDarkMode);
        setIsDarkMode(!isDarkMode);
    };

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        if (indexOptions === 1) {
            getUsers();
            setIndexOptions(1);
        }

    }, [refreshKey]);

    const handleSignOut = () => {
        removeCookie('usuario');
        removeCookie('peopleList');
        navigate("/");
    };

    const handleSearchIndex = (nuevoValor) => {
        setIndexOptions(nuevoValor);
    };

    const handleFriendEmail = (nuevoValor, nuevoIndice) => {
        setFriendEmail(nuevoValor);
        setIndexOptions(nuevoIndice);
    };

    const handleRefresh = () => {
        // Incrementa refreshKey para forzar una actualización de renderizado
        setRefreshKey((refreshKey) => refreshKey + 1);
    };

    let contentToRender = null;

    const getPosts = () => {
        const dataUser = cookies.usuario;

        const data = {
            userEmail: dataUser.email
        }

        fetch(`${apiIp}:8080/getFriendPosts`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                setPostList(res.publicaciones)
                setIndexOptions(3)
            })
            .catch((error) => console.error(error));
    };

    const getUsers = async () => {
        const dataUser = cookies.usuario;

        const data = {
            userEmail: dataUser.email,
        };

        try {
            const response = await fetch(`${apiIp}:8080/getCommonFriendsAndSpecialty`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const res = await response.json();
            setPeople(res);
            setIndexOptions(1)
        } catch (error) {
            console.error(error);
        }
    };

    const getFriends = () => {
        const dataUser = cookies.usuario;

        const data = {
            userEmail: dataUser.email
        }

        fetch(`${apiIp}:8080/getFriendLists`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                // console.log(res)
                setFriends(res.amigos);
                setIndexOptions(4)
            })
            .catch((error) => console.error(error));
    };

    const getChatFriends = () => {
        const dataUser = cookies.usuario;

        const data = {
            userEmail: dataUser.email
        }

        fetch(`${apiIp}:8080/getFriendLists`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                // console.log(res)
                setChatFriends(res.amigos);
                setIndexOptions(5)
            })
            .catch((error) => console.error(error));
    };

    if (indexOptions === 0) {
        contentToRender = (
            <Profile />
        );
    } else if (indexOptions === 1) {
        contentToRender = (
            <Search handleSearchIndex={handleSearchIndex} correo={cookies.usuario.email} onRefresh={handleRefresh} lista={people} handleEmail={handleFriendEmail} />
        );
    }
    else if (indexOptions === 2) {
        // contentToRender = (
        //     <CreatePost id_usuario={cookies.usuario.id} user_token={cookies.usuario.token} />
        // );
    } else if (indexOptions === 3) {
        contentToRender = (
            <Posts correo={cookies.usuario.email} lista={postList} />
        );
    } else if (indexOptions === 4) {
        // contentToRender = (
        //     <section className="home" style={{ overflowY: "auto", padding: "5%" }}>
        //         <Users title="My friends" lista={friends} index={1} correo={cookies.usuario.email} onRefresh={handleRefresh} handleIndex={handleSearchIndex} handleEmail={handleFriendEmail} handleGetUsers={getUsers} />
        //     </section>
        // );
    }
    else if (indexOptions === 5) {
        // contentToRender = (

        // );
    }
    else if (indexOptions === 6) {
        // contentToRender = (
        //     < FriendProfile correo={friendEmail} onRefresh={handleRefresh} handleIndex={handleSearchIndex} handleEmail={handleFriendEmail} handleGetUsers={getUsers} />
        // );
    }else if (indexOptions === 7) {
        contentToRender = (
            < Consultas />
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
                        <ul className="menu-links">
                            <li className="nav-link">
                                <Link onClick={() => setIndexOptions(0)}>
                                    <i className='bx bx-user-circle icon'></i>
                                    <span className="text nav-text">Profile</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link onClick={getUsers}>
                                    <i className='bx bx-search-alt icon'></i>
                                    <span className="text nav-text">Search Friends</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link onClick={() => setIndexOptions(2)}>
                                    <i className='bx bx-message-rounded-add icon'></i>
                                    <span className="text nav-text">Create a Post</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link onClick={getPosts}>
                                    <i className='bx bx-detail icon'></i>
                                    <span className="text nav-text">Posts</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link onClick={getFriends}>
                                    <i className='bx bxs-user-detail icon'></i>
                                    <span className="text nav-text">Friends</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link onClick={getChatFriends}>
                                    <i className='bx bx-message-dots icon'></i>
                                    <span className="text nav-text">Chat</span>
                                </Link>
                            </li>

                            <li className="nav-link">
                                <Link onClick={() => setIndexOptions(7)}>
                                    <i className='bx bx-message-rounded-add icon'></i>
                                    <span className="text nav-text">Consultas</span>
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

export default Home;
