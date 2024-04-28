import React, { useState, useRef, useEffect, Fragment } from "react";
import "./Styles/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { format, parseISO } from 'date-fns';
import "react-h5-audio-player/lib/styles.css";
import { Input } from 'antd';
import { useCookies } from 'react-cookie';

function EditProducts() {
    const [listaProductos, setListaProductos] = useState([]);
    const [cookies, setCookie, removeCookie] = useCookies(['usuario']);
    const [productoEditando, setProductoEditando] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);
    const isInitialMount = useRef(true);
    const apiIp = process.env.REACT_APP_API_IP;

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        fetch(`${apiIp}:5000/products/${cookies.usuario.id_user}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
        })
            .then((response) => response.json())
            .then((res) => {
                setListaProductos(res.products);
            })
            .catch((error) => console.error(error));
    }, [refreshKey]);

    const handleRefresh = () => {
        setRefreshKey((refreshKey) => refreshKey + 1);
    };

    const handleEdit = (product) => {
        setProductoEditando(product);
    };

    const handleSave = () => {
        let producto = null;
        const newListProducts = listaProductos.map(item =>
            item.id_product === productoEditando.id_product ? producto = productoEditando : item
        )
        setListaProductos(newListProducts);
        setProductoEditando(null);
        
        console.log(producto)
        producto["correo"]=cookies.usuario.correo
        console.log(producto)
        fetch(`${apiIp}:5000/updateProduct/${producto.id_product}`, {
            method: "PUT",
            body: JSON.stringify(producto),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((res) => {
                console.log(res)
                if (res.success) {
                    alert(res.message);
                    handleRefresh();
                } else {
                    alert(res.message);
                }
            })
            .catch((error) => console.error(error));
        handleRefresh();
    };

    const handleCancelEdit = () => {
        setProductoEditando(null);
    };

    const handleChange = (e, field) => {
        setProductoEditando({
            ...productoEditando,
            [field]: e.target.value
        });
    };

    return (
        <Fragment>
            <section className="home" style={{ display: 'flex', justifyContent: "center", alignItems: "center", paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%", paddingBottom: "5%" }}>
                <div className="profile-form" style={{ textAlign: "left", backgroundColor: "#0d0c1b", borderRadius: "25px", display: "flex", alignItems: "center", flexDirection: "column" }}>
                    <h1>Products List</h1>
                    <div className="form" style={{ justifyContent: "center", alignItems: 'center', height: "100%", display: "flex", flexDirection: "column" }}>
                        <div className="input-container" style={{ overflowY: "auto" }}>
                            <table className="table-light table table-bordered" style={{ fontSize: "16px", textAlign: "center" }}>
                                <thead>
                                    <tr>
                                        <th scope="col">No.</th>
                                        <th scope="col">Product</th>
                                        <th scope="col">Description</th>
                                        <th scope="col">Price</th>
                                        <th scope="col">Stock</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider">
                                    {listaProductos.map((product, index) => (
                                        <tr key={product.id_product}>
                                            <td scope="row" className="align-middle">{index + 1}</td>
                                            <td className="align-middle">
                                                {
                                                    productoEditando && productoEditando.id_product === product.id_product ? (
                                                        <Input
                                                            id="inputEditP"
                                                            type="text"
                                                            required
                                                            style={{ color: "black" }}
                                                            placeholder="Name"
                                                            aria-label="Name"
                                                            value={productoEditando.name}
                                                            onChange={(e) => handleChange(e, 'name')}
                                                        />
                                                    ) : (
                                                        product.name
                                                    )
                                                }
                                            </td>
                                            <td className="align-middle">
                                                {
                                                    productoEditando && productoEditando.id_product === product.id_product ? (
                                                        <Input.TextArea
                                                            autoSize={{ minRows: 2, maxRows: 6 }}
                                                            required
                                                            style={{ color: "black" }}
                                                            placeholder="Description"
                                                            aria-label="Description"
                                                            value={productoEditando.description}
                                                            onChange={(e) => handleChange(e, 'description')}
                                                        />
                                                    ) : (
                                                        product.description
                                                    )
                                                }
                                            </td>
                                            <td className="align-middle">
                                                {
                                                    productoEditando && productoEditando.id_product === product.id_product ? (
                                                        <Input
                                                            type="text"
                                                            required
                                                            style={{ color: "black" }}
                                                            placeholder="Price"
                                                            aria-label="Price"
                                                            value={productoEditando.price}
                                                            onChange={(e) => handleChange(e, 'price')}
                                                        />
                                                    ) : (
                                                        product.price
                                                    )
                                                }
                                            </td>
                                            <td className="align-middle">
                                                {
                                                    productoEditando && productoEditando.id_product === product.id_product ? (
                                                        <Input
                                                        id="inputEditSt"
                                                            type="text"
                                                            required
                                                            style={{ color: "black" }}
                                                            placeholder="Stock"
                                                            aria-label="Stock"
                                                            value={productoEditando.stock}
                                                            onChange={(e) => handleChange(e, 'stock')}
                                                        />
                                                    ) : (
                                                        product.stock
                                                    )
                                                }
                                            </td>
                                            <td className={`align-middle`}>
                                                {
                                                    productoEditando && productoEditando.id_product === product.id_product ? (
                                                        <div>
                                                            <button
                                                                type="button"
                                                                className="btn btn-success"
                                                                onClick={handleSave}
                                                                style={{ width: 'auto', height: 'auto' }}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check2-circle" viewBox="0 0 16 16">
                                                                    <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
                                                                    <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
                                                                </svg>
                                                            </button>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger"
                                                                onClick={handleCancelEdit}
                                                                style={{ width: 'auto', height: 'auto' }}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                                                                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                                                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <button
                                                            type="button"
                                                            onClick={() => handleEdit(product)}
                                                            className="btn btn-outline-primary"
                                                            style={{ width: 'auto', height: 'auto' }}
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325" />
                                                            </svg>
                                                        </button>
                                                    )
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </Fragment>
    );
}

export default EditProducts;
