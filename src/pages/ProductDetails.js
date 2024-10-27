import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import '../assets/styles/productdetail.css';
import AddToCart from '../pages/Customer/AddToCart';

const ProductDetails = ({ addToCart }) => {
    const { productId } = useParams(); // Extract productId from URL parameters
    const navigate = useNavigate();
    
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const token = localStorage.getItem('token'); // Get the token from localStorage
                const response = await axios.get(`https://localhost:7108/api/Vendor/getProductDetail`, {
                    headers: {
                        Authorization: `Bearer ${token}`, // Set the token in the headers
                    },
                    params: {
                        productId: productId,
                    },
                });

                if (response.data.isSuccess) {
                    setProduct(response.data.data);
                    setSelectedImage(response.data.data.image1); // Set default selected image
                } else {
                    setError(response.data.messages || 'Failed to load product details.');
                }
            } catch (error) {
                setError('Failed to load product details.');
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [productId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found!</div>;

    const handleAddToCart = () => {
        addToCart(product);
        navigate('/cart');
    };

    return (
        <div className="product-detail">
            <div className="product-detail__container">
                {/* Main Image Section */}
                <div className="main-image">
                    <img src={`https://localhost:7108/${selectedImage}`} alt={product.name} />
                </div>

                {/* Thumbnail Images Section */}
                <div className="image-slider">
                    {[product.image1, product.image2, product.image3, product.image4].map((image, index) => (
                        image && (
                            <img
                                key={index}
                                src={`https://localhost:7108/${image}`}
                                alt={product.name}
                                onClick={() => setSelectedImage(image)}
                                className={selectedImage === image ? 'active' : ''}
                            />
                        )
                    ))}
                </div>
            </div>

            {/* Product Info Section */}
            <div className="product-detail__details">
                <h2>{product.name}</h2>
                <p>{product.description}</p>
                <p>Category: {product.category}</p>
                <p>Price: ${product.price.toFixed(2)}</p> {/* Format price to two decimal places */}
                <button onClick={handleAddToCart}>
                {<AddToCart productId={product.productId} />}
                </button>
            </div>
        </div>
    );
};

ProductDetails.propTypes = {
    addToCart: PropTypes.func.isRequired, // Validate that addToCart is provided as a function
};

export default ProductDetails;
