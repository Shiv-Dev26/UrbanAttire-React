// src/components/Footer.js
import React from 'react';
import '../assets/styles/common.css'; // Adjust path as necessary
import '../assets/styles/Footer.css'; // New CSS file for footer styles

const Footer = () => {
    return (
        <footer className="footer">

            <div className="footer-container">

                <div className="footer-section">
                    <h3>About Us</h3>
                    <p>Learn more about UrbanAttire, our mission, and our values.</p>
                    <p>Read More</p>
                </div>

                <div className="footer-section">
                    <h3>Customer Service</h3>
                    <ul>
                        <li>Help Center</li>
                        <li>Returns & Exchanges</li>
                        <li>Shipping Information</li>
                        <li>Contact Us</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Legal</h3>
                    <ul>
                        <li>Terms of Service</li>
                        <li>Privacy Policy</li>
                        <li>Cookie Policy</li>
                    </ul>
                </div>

                <div className="footer-section">
                    <h3>Connect with Us</h3>
                    <ul>
                        <li>Facebook</li>
                        <li>Instagram</li>
                        <li>Twitter</li>
                        <li>LinkedIn</li>
                    </ul>
                </div>

            </div>

            <div className="footer-bottom">
                <p>&copy; 2024 UrbanAttire. All rights reserved.</p>
            </div>

        </footer>
    );
};

export default Footer;
