import React, { useState, useEffect, useRef, Fragment } from "react";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from 'react-cookie';
import "react-h5-audio-player/lib/styles.css";
import SearchBar from "./SearchBar";
import People from "./People";

function Search(props) {
    const [specificList, setSpecificList] = useState([]);
    const [commonList, setCommonList] = useState([]);
    const [specialtyList, setSpecialtyList] = useState([]);
    const isInitialMount = useRef(true);
    const apiIp = process.env.REACT_APP_API_IP;

    useEffect(() => {
        const homeDiv = document.querySelector('.home');
        homeDiv.style.paddingTop = '0%';
        // console.log("Search correo")
        // console.log(props.lista)
        setCommonList(props.lista.amigosEnComun)
        setSpecialtyList(props.lista.amigosEspecialidad)
    }, [props.lista]);

    const toggleSearchBar = () => {
        props.handleSearchIndex(0);
    };

    const handleSearch = (searchQuery) => {
        // console.log(searchQuery);
        const data = {
            userEmail: props.correo,
            fullname: searchQuery
        }
        // console.log(data)

        fetch(`${apiIp}:8080/searchPerson`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((res) => {
                setSpecificList(res.people);
            })
            .catch((error) => console.error(error));
    };

    const handleSeeProfile = (key) => {
        // alert(`See profile of: ${key}`);
        props.handleEmail(key, 6);
    };

    return (
        <section className="home" style={{ overflowY: "auto", padding: "5%" }}>
            <div>
                {(
                    <SearchBar
                        onSearch={handleSearch}
                        onClose={toggleSearchBar}
                    />
                )}
            </div>
            <div>
                {
                    <Fragment>
                        <People
                            title="Search results"
                            lista={specificList}
                            index={1}
                            correo={props.correo}
                            onRefresh={props.onRefresh}
                            handleEmail={handleSeeProfile}
                        />
                        <People
                            title="Friends in common"
                            lista={commonList}
                            index={1}
                            correo={props.correo}
                            onRefresh={props.onRefresh}
                            handleEmail={handleSeeProfile}
                        />
                        <People
                            title="People with your same specialty"
                            lista={specialtyList}
                            index={2}
                            correo={props.correo}
                            onRefresh={props.onRefresh}
                            handleEmail={handleSeeProfile}
                        />
                    </Fragment>
                }
            </div>
        </section>
    );
};

export default Search;
