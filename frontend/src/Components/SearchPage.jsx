import React, { useEffect } from "react";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    MDBCard,
    MDBCardImage,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBRow,
    MDBCol
} from 'mdb-react-ui-kit';

function SearchPage(props) {

    // const [cookies, setCookie] = useCookies(['usuario']);
    // const navigate = useNavigate();
    const apiIp = process.env.REACT_APP_API_IP;

    useEffect(() => {
        console.log(props.filteredSongs)
    }, []);

    const handleAlbum = (key, description, name) => {
        //alert(`Album ${key}`);
        sendDataToSearch(key, "Album", name)
    };

    const handleArtist = (key, description, name) => {
        sendDataToSearch(key, "Artist", name)
    };

    const handleSong = (key) => {
        // alert(`Song ${key}`);
        if (props.isPlaylist === true) {
            const data = {
                id_user: props.id_usuario,
                id_playlist: props.id_playlist,
                id_song: key
            }

            fetch(`${apiIp}:8080/addSongsPlayList`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    if (res.state === true) {
                        alert("The song has been added to your playlist!!")
                    } else {
                        alert("There was a problem adding the song to your playlist.")
                    }
                })
                .catch((error) => console.error(error));
        } else{
            const data = {
                id_user: props.id_usuario,
                id_song: key
            }
    
            fetch(`${apiIp}:8080/getSong`, {
                method: "POST",
                body: JSON.stringify(data),
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((res) => {
                    console.log(res)
                    let listaAux = []
                    listaAux.push(res)
                    props.onMusicList(listaAux, 0)
                })
                .catch((error) => console.error(error));
        }
    };

    const handleAddSong = (key) => {
        const data = {
            id_user: props.id_usuario,
            id_song: key
        }

        fetch(`${apiIp}:8080/AddtoFavorites`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                // console.log(res.Response)
                if (res.Response === "true") {
                    alert("The song has been added to your favorites list!!")
                    // props.onRefresh();
                } else {
                    alert("There was a problem adding the song to your favorites list.")
                }
            })
            .catch((error) => console.error(error));
    };

    const handleDeleteSong = (key) => {
        const data = {
            id_user: props.id_usuario,
            id_song: key
        }

        fetch(`${apiIp}:8080/deleteFromFavorites`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                // console.log(res.Response)
                if (res.Response === "true") {
                    alert("The song has been deleted from your favorites list!!")
                    // props.onRefresh();
                } else {
                    alert("There was a problem deleting the song from your favorites list.")
                }
            })
            .catch((error) => console.error(error));
    };

    const sendDataToSearch = (key, description, name) => {

        // Llama a la función que se pasó desde el componente padre
        props.sendDataToSearch(key, description, name);
    };

    return (
        <div style={{ marginBottom: "5%" }}>
            <h2 style={{ fontFamily: "'Ubuntu Mono', monospace", color: "#413D4B", marginBottom: "2rem" }}>
                {props.titulo}
            </h2>
            <MDBRow className='row-cols-1 row-cols-md-3 g-4'>

                {props.filteredSongs.map(item => (
                    item.tipo === 1 ? (
                        <MDBCol key={item.id_album}>
                            <MDBCard onClick={() => handleAlbum(item.id_album, item.description, item.name)} className='p-3 my-style-card h-100' style={{ backgroundColor: '#130048', color: "white" }}>
                                <div style={{ maxWidth: "100%", maxHeight: "200px", display: 'flex', justifyContent: 'center' }}>
                                    <MDBCardImage
                                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                                        src={item.photo}
                                    />
                                </div>
                                <MDBCardBody className='p-0 mt-3' style={{ display: 'flex', justifyContent: 'space-between', maxHeight: "25%" }}>
                                    <div>
                                        <MDBCardTitle style={{ fontFamily: "'Ubuntu Mono', monospace", fontSize: "20px" }}>{item.name}</MDBCardTitle>
                                        <MDBCardText style={{ fontFamily: "'Ubuntu Mono', monospace", fontSize: "17px", color: "#D1D0D0", display: 'flex', alignItems: 'center' }}>
                                            {item.description}
                                        </MDBCardText>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ) : item.tipo === 2 ? (
                        <MDBCol>
                            <MDBCard key={item.id_artist} onClick={() => handleArtist(item.id_artist, item.birthdate, item.name)} className='p-3 my-style-card h-100' style={{ backgroundColor: '#130048', color: "white" }}>
                                <div style={{ maxWidth: "100%", maxHeight: "200px", display: 'flex', justifyContent: 'center' }}>
                                    <MDBCardImage
                                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                                        src={item.photo}
                                    />
                                </div>
                                <MDBCardBody className='p-0 mt-3' style={{ display: 'flex', justifyContent: 'space-between', maxHeight: "25%" }}>
                                    <div>
                                        <MDBCardTitle style={{ fontFamily: "'Ubuntu Mono', monospace", fontSize: "20px" }}>{item.name}</MDBCardTitle>
                                        <MDBCardText style={{ fontFamily: "'Ubuntu Mono', monospace", fontSize: "17px", color: "#D1D0D0", display: 'flex', alignItems: 'center' }}>
                                            {item.birthdate}
                                        </MDBCardText>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ) : item.tipo === 3 ? (
                        <MDBCol>
                            <MDBCard key={item.id_song} className='p-3 my-style-card h-100' style={{ backgroundColor: '#130048', color: "white" }}>
                                <div onClick={() => handleSong(item.id_song)} style={{ maxWidth: "100%", maxHeight: "200px", display: 'flex', justifyContent: 'center' }}>
                                    <MDBCardImage
                                        style={{ maxWidth: '100%', maxHeight: '200px' }}
                                        src={item.photo}
                                    />
                                </div>
                                <MDBCardBody className='p-0 mt-3' style={{ display: 'flex', justifyContent: 'space-between', maxHeight: "25%" }}>
                                    <div>
                                        <MDBCardTitle onClick={() => handleSong(item.id_song)} style={{ fontFamily: "'Ubuntu Mono', monospace", fontSize: "20px" }}>{item.name}</MDBCardTitle>
                                        <MDBCardText style={{ fontFamily: "'Ubuntu Mono', monospace", fontSize: "17px", color: "#D1D0D0", display: 'flex', alignItems: 'center' }}>
                                            {item.artist}
                                            {item.isSong === "true" && (
                                                <button className="like-btn" style={{ marginLeft: '20px', transition: 'transform 0.2s', transform: 'scale(1)' }}>
                                                    {item.isFavorite === "true" ?
                                                        (<i onClick={() => handleDeleteSong(item.id_song)} className="material-icons opacity-10" style={{ color: "red", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>favorite</i>
                                                        )
                                                        :
                                                        (<i onClick={() => handleAddSong(item.id_song)} className="material-icons opacity-10" style={{ color: "white", display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>favorite</i>
                                                        )}
                                                </button>
                                            )}
                                        </MDBCardText>
                                    </div>
                                </MDBCardBody>
                            </MDBCard>
                        </MDBCol>
                    ) : null
                ))}
            </MDBRow>
        </div>
    );
};

export default SearchPage;
