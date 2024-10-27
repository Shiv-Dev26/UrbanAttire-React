import React from 'react';
import '../../assets/styles/common.css'; // Optional: Add your own styles

function CartItem({ item, removeFromCart }) {
    return (
        <div className="cart-item">
            <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
            <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)} x {item.quantity}</p>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                    Remove
                </button>
            </div>
        </div>
    );
}

export default CartItem;
