// src/components/ProductCard.js
import React from 'react';
import PropTypes from 'prop-types';
import '../assets/styles/common.css';
import '../assets/styles/card.css'; // Optional: Add your own styles
// import AddToCart from '../pages/Customer/AddToCart';

import { useNavigate } from 'react-router-dom';
 // Optional: Add your own styles

const ProductCard = ({ product }) => {
    const navigate = useNavigate();

    // Function to handle product click and navigate to details page
    

    const handleProductClick = () => {
        navigate(`/product/${product.productId}`);
    };

    return (
        <div 
            className="product-card"
            onClick={handleProductClick}
            style={{ cursor: 'pointer' }}
        >
       
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
    
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        productId: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
    }).isRequired,
};

export default ProductCard;
