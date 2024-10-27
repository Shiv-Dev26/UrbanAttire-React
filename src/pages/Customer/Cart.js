// src/pages/Customer/Cart.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../assets/styles/common.css'; // Import the CSS for styling

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalSellingPrice, setTotalSellingPrice] = useState(0);
    const [totalItem, setTotalItem] = useState(0);
    const [totalMrp, setTotalMrp] = useState(0);
    const [totalDiscount, setTotalDiscount] = useState(0);
    const [totalDiscountAmount, setTotalDiscountAmount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [orderMessage, setOrderMessage] = useState('');

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                setLoading(true);
                const response = await axios.get('https://localhost:7108/api/Customer/getCartList', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });
                console.log('API Response:', response.data);

                if (response.data.isSuccess) {
                    const {
                        cartProducts,
                        totalItem,
                        totalMrp,
                        totalDiscount,
                        totalDiscountAmount,
                        totalSellingPrice
                    } = response.data.data;

                    setCartItems(cartProducts || []);
                    setTotalItem(totalItem || 0);
                    setTotalMrp(totalMrp || 0);
                    setTotalDiscount(totalDiscount || 0);
                    setTotalDiscountAmount(totalDiscountAmount || 0);
                    setTotalSellingPrice(totalSellingPrice || 0);
                } else {
                    console.error('Error message from server:', response.data.messages);
                    setError(response.data.messages || 'Failed to load cart items');
                }
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setError(error.response?.data?.message || 'Failed to load cart items');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handlePlaceOrder = async () => {
        try {
            const orderData = {
                items: cartItems.map(item => ({
                    productId: item.productId, // Assuming your cartItems have productId
                    quantity: item.quantity,
                })),
                totalAmount: totalSellingPrice,
            };

            const response = await axios.post('https://localhost:7108/api/Customer/addOrder', orderData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Authorization token
                },
            });

            if (response.data.isSuccess) {
                setOrderMessage("Order placed successfully!");

                // Clear the cart
                setCartItems([]);
                setTotalItem(0);
                setTotalMrp(0);
                setTotalDiscount(0);
                setTotalDiscountAmount(0);
                setTotalSellingPrice(0);
            } else {
                setOrderMessage("Failed to place order: " + response.data.messages);
            }
        } catch (error) {
            setOrderMessage("Error placing order: " + (error.response?.data?.message || error.message));
        }
    };

    if (loading) {
        return <p className="loading-message">Loading cart items...</p>;
    }

    if (error) {
        return <p className="error-message">{error}</p>;
    }

    return (
        <div className="cart-container">
            <h2 className="cart-title">Shopping Cart</h2>
            <div className="cart-summary">
                <p>Total Items: {totalItem}</p>
                <p>Total MRP: ${totalMrp.toFixed(2)}</p>
                <p>Total Discount: {totalDiscount}%</p>
                <p>Total Discount Amount: ${totalDiscountAmount.toFixed(2)}</p>
                <p>Total Selling Price: ${totalSellingPrice.toFixed(2)}</p>
            </div>

            <ul className="cart-items-list">
                {cartItems.map((item, index) => (
                    <li className="cart-item" key={index}>
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-description">Description: {item.description}</p>
                        <p className="cart-item-category">Category: {item.category}</p>
                        <p className="cart-item-price">Price: ${item.price.toFixed(2)}</p>
                        <p className="cart-item-quantity">Quantity: {item.quantity}</p>
                    </li>
                ))}
            </ul>

            <button onClick={handlePlaceOrder} className="place-order-button">Place Order</button>
            {orderMessage && <p className="order-message">{orderMessage}</p>}
        </div>
    );
};

export default Cart;
