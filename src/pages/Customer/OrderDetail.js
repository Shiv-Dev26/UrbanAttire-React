// src/pages/Customer/OrderDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../../assets/styles/OrderDetail.css'; // Import CSS for styling

const OrderDetail = () => {
    const { orderId } = useParams(); // Get orderId from URL parameters
    const [orderDetail, setOrderDetail] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                // Fetch the order details by orderId
                const response = await axios.get(`https://localhost:7108/api/Customer/getOrderDetail`, {
                    params: { orderId }, // Use query parameter
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                });

                if (response.data.isSuccess) {
                    setOrderDetail(response.data.data);
                } else {
                    setError('Failed to fetch order details: ' + response.data.messages);
                }
            } catch (error) {
                setError('Error fetching order details: ' + error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchOrderDetails();
    }, [orderId]);

    if (loading) return <p>Loading order details...</p>;
    if (error) return <p>{error}</p>;

    // Sort the order items based on `orderItemId` in descending order
    const sortedOrderItems = orderDetail.orderItemDTO.sort((a, b) => b.orderItemId - a.orderItemId);

    return (
        <div className="order-detail-container">
            <h2>Order Details for Order #{orderDetail.orderId}</h2>
            <div className="order-info">
                <p>Total Amount: ${orderDetail.totalAmount}</p>
                <p>Order Status: {orderDetail.orderStatus}</p>
                <p>Payment Status: {orderDetail.paymentStatus}</p>
                <p>Order Date: {orderDetail.orderDate}</p>
                <p>Delivery Date: {orderDetail.deliveryDate}</p>
            </div>

            <h3>Items in this Order:</h3>
            <div className="order-items">
                {sortedOrderItems.map(item => (
                    <div key={item.orderItemId} className="order-item-card">
                       {/* <img src={item.productImageUrl} alt={item.productName} className="product-image" />*/} 
                        <div className="product-details">
                            <h4>{item.productName}</h4>
                            <p>Quantity: {item.quantity}</p>
                            <p>Price at Purchase: ${item.priceAtPurchase}</p>
                            <p>Description: {item.productDescription}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderDetail;
