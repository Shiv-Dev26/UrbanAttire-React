import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Ensure useNavigate is used
import axios from 'axios';
import '../../assets/styles/common.css'; // Ensure to import the common CSS file

const Login = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false); 
    const [emailOrPhone, setEmailOrPhone] = useState(''); // State for email or phone input
    const [password, setPassword] = useState(''); // State for password input
    const [errorMessage, setErrorMessage] = useState(''); // State for error messages
    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        setErrorMessage(''); // Reset error message on each login attempt

        try {
            // API call to login
            const response = await axios.post('https://localhost:7108/api/Account/Login', {
                emailOrPhone, // Send email or phone for the request
                password,
            });

            // Check for success response
            if (response.data.isSuccess) {
                console.log('Login successful:', response.data);
                
                // Store user info in local storage or context
                localStorage.setItem('userId', response.data.data.id); // Store user ID
                localStorage.setItem('userEmail', response.data.data.email); // Store user email
                localStorage.setItem('userRole', response.data.data.role);
                localStorage.setItem('token', response.data.data.token);

                // Get the user role from the response
                setIsAuthenticated(true);
                const userRole = response.data.data.role; // Define userRole here
                navigate('/');

                // Clear input fields after successful login
                setEmailOrPhone('');
                setPassword('');

                // Navigate to different routes based on user role
                if (userRole === 'Customer') {
                    navigate('/'); // Home for customers
                } else if (userRole === 'Vendor') {
                    navigate('/'); // Dashboard or manage products for vendors
                }
            } else {
                console.error('Login failed:', response.data.messages);
                setErrorMessage(response.data.messages); // Set error message for invalid login
            }
        } catch (error) {
            // Log the error and display an appropriate message
            console.error('Login error:', error.response ? error.response.data : error.message);
            setErrorMessage('An error occurred. Please try again.'); // Set generic error message
        }
        window.location.reload();
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleLogin}>
                <h2 className="login-title">Login</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>} {/* Display error messages */}
                
                <div className="input-group">
                    <input
                        type="text" // Allow both email and phone inputs
                        value={emailOrPhone}
                        onChange={(e) => setEmailOrPhone(e.target.value)}
                        placeholder="Email or Phone Number"
                        className="login-input"
                        required
                    />
                </div>
                <div className="input-group">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        className="login-input"
                        required
                    />
                </div>
               <button type="submit" className="login-button">Login</button> 
                
                <div className="register-link">
                    Don't have an account? 
                    <span 
                        onClick={() => navigate('/signup')}  // Navigate to signup page
                        style={{ cursor: 'pointer', color: '#ff6f61' }}
                    >
                        Sign Up
                    </span>
                </div>
            </form>
        </div>
    );
};

export default Login;
