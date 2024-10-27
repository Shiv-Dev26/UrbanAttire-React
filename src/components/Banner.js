// src/components/Banner.js
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import '../assets/styles/banner.css'; // Ensure this path is correct

// Import banner images
import banner1 from '../assets/images/banner1.png';
import banner2 from '../assets/images/banner2.png';
import banner3 from '../assets/images/banner3.png';
import banner4 from '../assets/images/banner4.png';

// Define an array of banner images
const banners = [
    { id: 1, image: banner1, alt: 'Banner 1' },
    { id: 2, image: banner2, alt: 'Banner 2' },
    { id: 3, image: banner3, alt: 'Banner 3' },
    { id: 4, image: banner4, alt: 'Banner 4' },
];

const Banner = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
        }, 3000); // Change image every 3 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="banner-container">
            <motion.div 
                className="banner-slider"
                initial={{ x: 0 }}
                animate={{ x: `-${currentIndex * 100}%` }} // Slide to the current index
                transition={{ duration: 0.6, ease: "easeInOut" }}
            >
                {banners.map((banner) => (
                    <motion.div 
                        className="banner-card" 
                        key={banner.id}
                    >
                        <img src={banner.image} alt={banner.alt} className="banner-image" />
                    </motion.div>
                ))}
            </motion.div>

            {/* Dot Indicators */}
            <div className="banner-dots">
                {banners.map((_, index) => (
                    <span
                        key={index}
                        className={`banner-dot ${index === currentIndex ? 'active' : ''}`}
                        onClick={() => setCurrentIndex(index)}
                    ></span>
                ))}
            </div>

            {/* Navigation Controls */}
            <button className="banner-nav left" onClick={() => setCurrentIndex((currentIndex - 1 + banners.length) % banners.length)}>
                &#10094; {/* Left Arrow */}
            </button>
            <button className="banner-nav right" onClick={() => setCurrentIndex((currentIndex + 1) % banners.length)}>
                &#10095; {/* Right Arrow */}
            </button>
        </div>
    );
};

export default Banner;
