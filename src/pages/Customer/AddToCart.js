import React, { useState } from 'react';
import axios from 'axios';

const AddToCart = ({ productId }) => {
    const [message, setMessage] = useState('');

    const handleAddToCart = async () => {
        try {
            console.log('Adding product with ID:', productId);  // Debugging the productId

            const response = await axios.post(`https://localhost:7108/api/Customer/addOrUpdateProductCart?productId=${productId}`, {
                quantity: 1,  // Include quantity if needed
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,  // Authorization token
                },
            });

            console.log('API Response:', response.data);

            if (response.data.isSuccess) {
                setMessage("Product added to cart successfully!");
            } else {
                setMessage("Failed to add product to cart: " + response.data.messages);
            }
        } catch (error) {
            setMessage("An error occurred while adding the product to the cart.");
            console.error('Error adding product to cart:', error);
        }
    };

    return (
        <div>
            <button onClick={handleAddToCart}>Add to Cart</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default AddToCart;
