// src/components/Navbar.js
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../assets/styles/common.css';

const Navbar = ({ userRole, isAuthenticated, handleLogout }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const onLogout = () => {
        handleLogout(); // Call the logout function passed as prop
        navigate('/'); // Redirect to home after logout
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-logo">
                    <img 
                        src={process.env.PUBLIC_URL + '/logo192.png'} 
                        alt="Urban Attire Logo" 
                        className="logo-image" 
                        onError={(e) => { e.target.onerror = null; e.target.src="/default-logo.png"; }} 
                    />
                </Link>
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
                        Home
                    </Link>
                </li>
                <li>
                    <Link to="/products" className={`navbar-link ${location.pathname === '/products' ? 'active' : ''}`}>
                        Products
                    </Link>
                </li>
                {isAuthenticated && userRole === 'Customer' && (
                    <>
                        <li>
                            <Link to="/cart" className={`navbar-link ${location.pathname === '/cart' ? 'active' : ''}`}>
                                Cart
                            </Link>
                        </li>
                        <li>
                            <Link to="/order" className={`navbar-link ${location.pathname === '/Order' ? 'active' : ''}`}>
                                Order
                            </Link>
                        </li>
                        <li>
                            <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>
                                Profile
                            </Link>
                        </li>
                    </>
                )}
                {isAuthenticated && userRole === 'Vendor' && (
                    <>
                        <li>
                            <Link to="/manage-products" className={`navbar-link ${location.pathname === '/manage-products' ? 'active' : ''}`}>
                                Manage Products
                            </Link>
                        </li>
                        
                        <li>
                            <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>
                                Profile
                            </Link>
                        </li>
                    </>
                )}
                {!isAuthenticated ? 
    <li>
        <Link to="/login" className={`navbar-link ${location.pathname === '/login' ? 'active' : ''}`}>
            Login
        </Link>
    </li>
: null}
            </ul>
        </nav>
    );
};

export default Navbar;
