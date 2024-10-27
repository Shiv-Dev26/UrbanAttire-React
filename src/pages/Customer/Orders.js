import React from 'react';

const Orders = () => {
    const orders = []; // Fetch from API

    return (
        <div>
            <h2>Your Orders</h2>
            {orders.map((order) => (
                <div key={order.id}>
                    <p>Order #{order.id}</p>
                    <p>Total: ${order.total}</p>
                </div>
            ))}
        </div>
    );
};

export default Orders;
