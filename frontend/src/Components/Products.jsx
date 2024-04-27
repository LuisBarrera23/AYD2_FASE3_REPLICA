import React, { Fragment, useEffect, useRef } from "react";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Products(props) {

    const isInitialMount = useRef(true);
    const apiIp = process.env.REACT_APP_API_IP;

    // useEffect(() => {
    //     if (isInitialMount.current) {
    //         isInitialMount.current = false;
    //         return;
    //     }
    //     console.log(props.index)
    //     console.log(props.lista)
    // }, []);

    const handleAddProduct = (product) => {
        props.onAddToCart(product);
    };

    return (
        <div style={{ marginBottom: "5%" }}>
            <div className="text" style={{ marginBottom: "2rem", padding: "0", fontSize: "3rem", fontWeight: "bolder" }}>
                {props.title}
            </div>
            <div className="container text-center">
                <div className="row row-cols-1 row-cols-lg-4 g-2 g-lg-3">
                    {
                        props.index === 1 && (
                            props.lista.map((product) => (
                                <div className="col" style={{ height: '100%' }} key={product.id_product}>
                                    <div className="p-3" style={{ height: '100%' }}>
                                        <div className="profile-card" style={{ textAlign: "left", backgroundColor: "#0d0c1b", borderRadius: "10px", display: "flex", flexDirection: "column", padding: "0%" }}>
                                            <div className="centered-container" style={{ display: "flex", justifyContent: "center", maxHeight: "11rem", alignItems: "center", overflowX: "auto" }}>
                                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", maxHeight: "10rem", maxWidth: "5rem" }}>
                                                    <img src={product.image} className="people-user-image" alt="Selected" style={{ objectFit: "cover" }} />
                                                </div>
                                            </div>


                                            <div style={{ height: "50%", maxWidth: "100%", margin: "0%", padding: "0%", backgroundColor: "white", borderBottomLeftRadius: '10px', borderBottomRightRadius: "10px" }}>
                                                <div className="input-container" style={{ textAlign: "center", color: "black", maxHeight: "5vh", overflowX: "auto", whiteSpace: "nowrap" }}>
                                                    <b>
                                                        <h5 title={product.name} style={{ margin: "0px" }}>{product.name}</h5>
                                                    </b>
                                                    <hr style={{ margin: "0px" }} />
                                                </div>
                                                <div className="d-flex" style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", maxWidth: "100%", color: "black", fontSize: "1.5vh" }}>
                                                    <div style={{ borderBottom: "1px solid black", margin: "0px", width: "90%", marginBottom: "1vh", overflowX: "auto", whiteSpace: "nowrap" }}>
                                                        {product.description}
                                                    </div>
                                                    <div style={{ width: "90%", margin: "0px", textAlign: "left" }}>
                                                        En stock: {product.stock}
                                                    </div>
                                                    <div style={{ width: "90%", margin: "0px", textAlign: "center" }}>
                                                        <button type="button" className="btn btn-outline-primary" style={{ width: '80%', height: 'auto', fontSize: "8px", overflow: "auto", margin: "0px", marginBottom: "1%" }} onClick={() => handleAddProduct(product)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                                                                <path filLRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <div style={{ width: "90%", margin: "0px", textAlign: "center", marginTop:"0.5vh" }}>
                                                        <b>
                                                            Q. {product.price}
                                                        </b>
                                                    </div>
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
        </div >
    );
};

export default Products;