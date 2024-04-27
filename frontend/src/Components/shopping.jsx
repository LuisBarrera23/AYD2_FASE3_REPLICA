import React from "react";
import "./Styles/shopping.css";

const ShoppingCartOverlay = (props) => {
    const { isOpen, cartItems, setCartItems, setindex} = props;

    const handleRemoveItem = (index) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
    };

    const handleDecreaseQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity > 1) {
            updatedCartItems[index].quantity -= 1;
            setCartItems(updatedCartItems);
        }
    };

    const handleIncreaseQuantity = (index) => {
        const updatedCartItems = [...cartItems];
        if (updatedCartItems[index].quantity < updatedCartItems[index].stock) {
            updatedCartItems[index].quantity += 1;
            setCartItems(updatedCartItems);
        } else{
            alert("No tenemos mas stock!")
        }
    };

    const calculateSubtotal = () => {
        let subtotal = 0;
        cartItems.forEach(item => {
            subtotal += item.quantity * item.price;
        });
        return subtotal;
    };

    return (
        <div className={`minicart ${isOpen ? 'open' : ''}`}>
            <header>
                <button type="button" className="cart-widget-close">
                    <span className="icon"></span>
                </button>
                <div className="minicart-title">
                    Carrito
                </div>
            </header>
            <section className="cart-content">
                <ul class="cart-line-item-list">
                    {props.cartItems.map((item, index) => (
                        <li key={index} className="cart-line-item">
                            <div className="item-container">
                                <div className="cart-item-image">
                                    <img src={item.image} alt={item.name} className="product-media" />
                                </div>
                                <div className="item-info">
                                    <div className="item-name">{item.name}</div>
                                    <div className="item-price"> Q {item.price}</div>
                                    <div className="product-quantity">
                                        <button className="minus-icon change-quantity-icon" onClick={() => handleDecreaseQuantity(index)}>-</button>
                                        <input type="number" value={item.quantity} className="product-quantity-input" />
                                        <button className="plus-icon change-quantity-icon" onClick={() => handleIncreaseQuantity(index)}>+</button>
                                    </div>
                                </div>
                            </div>
                            <button className="remove-item" onClick={() => handleRemoveItem(index)}>
                                <span className="remove-icon">x</span>
                            </button>
                        </li>
                    ))}
                </ul>
                <section className="cart-widget-subtotal">
                    <div className="cart-widget-subtotal-title">
                        Subtotal : Q {calculateSubtotal()}
                    </div>
                </section>
            </section>
            <footer>
                <a onClick={() => setindex(4)} className="button-primary is-button-wide view-cart-button" style={{ textDecoration: 'none' }}>
                    Ir al carrito
                </a>
            </footer>
        </div>
    );
};

export default ShoppingCartOverlay;
