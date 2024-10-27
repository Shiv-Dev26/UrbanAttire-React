// src/pages/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Banner from '../components/Banner'; // Ensure the path is correct
import { motion } from 'framer-motion';
import '../assets/styles/common.css';

const Home = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleShopNowClick = () => {
      navigate('/products'); // Navigate to the product page
  };

    return (
        <div className="home-container">
            {/* Animated Header Section */}
            <motion.div 
                className="hero"
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
            >
                <h1 className="hero-title">Welcome to Urban Attire</h1>
                <p className="hero-subtitle">Discover the latest fashion trends for everyone.</p>
                
                 {/* Banner Section */}
            <Banner />
                <motion.button
                    className="shop-now-btn"
                    onClick={handleShopNowClick}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    Shop Now
                </motion.button>
            </motion.div>

           

            {/* Categories Section */}
            <div className="categories">
                {/* Your category cards go here */}
            </div>
        </div>
    );
};

export default Home;
