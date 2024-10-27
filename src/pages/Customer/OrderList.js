// src/pages/Customer/OrderList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../assets/styles/common.css'; // Custom CSS for styling

const OrderList = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://localhost:7108/api/Customer/getOrderList', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Authorization token
                    },
                });

                if (response.data.isSuccess) {
                    setOrders(response.data.data);  // Set the orders
                } else {
                    setError('Failed to fetch orders: ' + response.data.messages);
                }
            } catch (error) {
                setError('Error fetching orders: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>{error}</p>;

    // Sort the orders by orderId in descending order
    const sortedOrders = orders.sort((a, b) => b.orderId - a.orderId);

    return (
        <div className="order-list-container">
            <h2>Your Orders</h2>
            <div className="order-list">
                {sortedOrders.map(order => (
                    <div key={order.orderId} className="order-card">
                        <h3 className="order-id">Order #{order.orderId}</h3>
                        <p className="order-total">Total: ${order.totalAmount}</p>
                        <p className="order-date">Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                        <Link to={`/order/${order.orderId}`} className="view-details-btn">
                            View Details
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderList; 
