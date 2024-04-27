import React, { useState, Fragment } from "react";
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "./Styles/carrito.css";
import logo from '../Images/Logo.png';
import { useCookies } from 'react-cookie';

const Carrito = (props) => {
    const { cartItems } = props;
    const apiIp = process.env.REACT_APP_API_IP;

    const [paymentMethod, setPaymentMethod] = useState('efectivo');
    const [shippingMethod, setShippingMethod] = useState('recoger');
    const [shippingAddress, setShippingAddress] = useState('');
    const [card, setCard] = useState('');

    const [cookies, setCookie] = useCookies(['usuario']);
    const [fullName, setFullName] = useState(cookies.usuario.nombre  + " " + cookies.usuario.apellido);
    

    const calculateTotal = () => {
        let total = calculateSubtotal();

        // Suma un 2% al total si se selecciona tarjeta
        if (paymentMethod === 'tarjeta') {
            total += total * 0.02;
        }

        // Suma 30 al total si se selecciona dirección de envío
        if (shippingMethod === 'direccion') {
            total += 30;
        }

        return total.toFixed(2);
    };

    const calculateSubtotal = () => {
        let subtotal = 0;
        cartItems.forEach(item => {
            subtotal += item.quantity * item.price;
        });
        return subtotal;
    };



    const enviarPedido = () => {
        const pedido = {
            productos: cartItems.map(item => ({
                id_producto: item.id_product,
                cantidad: item.quantity
            })),
            pago: paymentMethod === 'tarjeta' ? card : paymentMethod,
            direccion: shippingMethod === 'direccion' ? shippingAddress : "Recogio en Hospital",
            id_user: cookies.usuario.id_user,
            total_compra: parseFloat(calculateTotal())
        };
        
        console.log(cartItems)

        fetch(`${apiIp}:5000/comprar`, {
            method: "POST",
            body: JSON.stringify(pedido),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then((response) => response.json())
        .then((res) => {
            console.log(res)
            if (res.status) {
                alert("Compra realizada con exito")
                generarFacturaPDF(res.id_compra, cartItems);
            } else {
                alert(`Error al hacer la compra`)
            }
        })
        .catch((error) => console.error(error));
    }

    const generarFacturaPDF = (idCompra, productos) => {
        const doc = new jsPDF();
    
        // Agregar logo de la empresa
        doc.addImage(logo, 'PNG', 10, 10, 50, 55); // Parámetros: ruta, formato de imagen, posición x, posición y, ancho, alto
    
        doc.setFontSize(18);
        doc.text('GT Hospital', 60, 30); // Posición del texto del nombre de la empresa
    
        doc.setFontSize(10);
        doc.text('Dirección: 123 Calle Principal, Ciudad', 60, 45);
        doc.text('Teléfono: +502 1122-3369', 60, 50);
        doc.text('Correo electrónico: rodolfo@gthospital.com', 60, 55);
    
        doc.setFontSize(16);
        doc.text('Factura de Compra', 10, 70);

        
    
        doc.setFontSize(12);
        doc.text(`ID de Compra: ${idCompra}`, 10, 80);
        const fechaActual = new Date().toLocaleDateString('es-ES');
        doc.text(`Fecha: ${fechaActual}`, 10, 90);
    

        doc.setFontSize(12);
        doc.text(`Nombre de usuario: ${fullName}`, 10, 95);
        doc.text(`Método de pago: ${paymentMethod === 'tarjeta' ? "Tarjeta (+2% de recarga) " : paymentMethod}`, 10, 100);
        doc.text(`Envío: ${shippingMethod === 'direccion' ? shippingAddress + " (Costo de Q30)" : "Recogio en Hospital"}`, 10, 105);

        // Crear un array de los datos de los productos para la tabla
        const data = productos.map(producto => [producto.name, producto.description, `Q ${producto.price.toFixed(2)}`, producto.quantity, `Q ${(producto.price * producto.quantity).toFixed(2)}`]);
    
        // Crear la tabla
        doc.autoTable({
            startY: 110, // Posición de inicio de la tabla
            head: [['Nombre', 'Descripción', 'Precio Unitario', 'Cantidad', 'Subtotal']],
            body: data,
            theme: 'grid',
            styles: {
                fontSize: 10,
                cellPadding: 2,
                overflow: 'linebreak'
            }
        });
    
        const total = calculateTotal();
        const totalX = doc.internal.pageSize.width - 50; // Ajusta el valor según sea necesario

        doc.setFontSize(16);
        doc.text(`Total: Q ${total}`, totalX, doc.autoTable.previous.finalY + 10);
    
        doc.save('factura.pdf');
    };


return (


    <Fragment>
        <section style={{ display: 'flex', justifyContent: "center", alignItems: "center", paddingLeft: "10%", paddingRight: "10%", paddingTop: "5%", paddingBottom: "5%" }}>
            <div style={{ textAlign: "left", overflowY: "auto", borderRadius: "25px", display: "flex", alignItems: "center", flexDirection: "column" }}>

                <div className="form" style={{ justifyContent: "center", alignItems: 'center', height: "100%", display: "flex", flexDirection: "column" }}>
                    <h1>Carrito de compras</h1>
                    <div className="container2">

                        <div className="product-list-2">
                            <ul>
                                {props.cartItems.map((item, index) => (
                                    <li key={index}>
                                        <div className="item-image">
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                        <div className="item-details">
                                            <div className="item-name">{item.name}</div>
                                            <div className="item-price">Q {item.price}</div>
                                            <div className="item-quantity">Cantidad: {item.quantity}</div>
                                        </div>
                                        <div className="subtotal-per-item">
                                            <div>Subtotal</div>
                                            <div>Q {item.quantity * item.price}</div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="order-summary">
                            <div className="order-summary-title">Resumen del pedido</div>
                            <div className="subtotal">
                                <div>Subtotal: Q {calculateSubtotal()}</div>
                            </div>

                            {/* Sección de Pago */}
                            <div className="payment-section">
                                <div className="payment-section-title">Metodo de Pago</div>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="efectivo"
                                            checked={paymentMethod === 'efectivo'}
                                            onChange={() => setPaymentMethod('efectivo')}
                                        />
                                        Efectivo
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="tarjeta"
                                            checked={paymentMethod === 'tarjeta'}
                                            onChange={() => setPaymentMethod('tarjeta')}
                                        />
                                        Tarjeta
                                    </label>
                                </div>
                                {paymentMethod === 'tarjeta' && (
                                    <div className="payment-details">
                                        <input type="text" placeholder="Nombre del titular" />
                                        <input type="text" placeholder="Número de tarjeta" 
                                            value={card}
                                            onChange={(e) => setCard(e.target.value)}/>

                                        <div className="payment-col">
                                            <input type="text" placeholder="CVC" />
                                            <input type="text" placeholder="MM/YY" />
                                        </div>

                                        <div>Recargo del 2%</div>
                                    </div>
                                )}
                            </div>

                            {/* Sección de Envío */}
                            <div className="shipping-section">
                                <div className="shipping-section-title">Envío</div>
                                <div>
                                    <label>
                                        <input
                                            type="radio"
                                            name="shipping"
                                            value="recoger"
                                            checked={shippingMethod === 'recoger'}
                                            onChange={() => setShippingMethod('recoger')}
                                        />
                                        Recoger
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="shipping"
                                            value="direccion"
                                            checked={shippingMethod === 'direccion'}
                                            onChange={() => setShippingMethod('direccion')}
                                        />
                                        Dirección
                                    </label>
                                </div>
                                {shippingMethod === 'direccion' && (
                                    <div className="shipping-details">
                                        <input type="text" placeholder="Dirección de envío"
                                            value={shippingAddress}
                                            onChange={(e) => setShippingAddress(e.target.value)} />
                                        <div>Costo Q30.00</div>
                                    </div>

                                )}
                            </div>

                            {/* Calcula el total */}
                            <div className="total">
                                <div>Total </div>
                                <div className="total-price"> Q{calculateTotal()}</div>
                            </div>

                            <button className="complete-order-button" onClick={enviarPedido}>Completar pedido</button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </Fragment>

);


};
export default Carrito;
