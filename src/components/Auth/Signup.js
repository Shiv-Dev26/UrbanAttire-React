import React, { useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Make sure axios is imported
import '../../assets/styles/common.css'; // Import the common CSS file

const Signup = () => {
    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: '',
        gender: '',
        dialCode: '',
        phoneNumber: '',
        streetAddress: ''
    });
    
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    // Handle form submission
    const handleSignup = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        setError(''); // Clear previous error messages
        setSuccess(''); // Clear previous success messages

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return; // Stop the function if passwords do not match
        }

        // Logging the data being submitted for debugging
        console.log('Submitting Data:', {
            email: formData.email,
            firstName: formData.firstname,
            lastName: formData.lastname,
            gender: formData.gender,
            dialCode: formData.dialCode,
            phoneNumber: formData.phoneNumber,
            streetAddress: formData.streetAddress,
            password: formData.password,
            role: formData.role,
        });

        try {
            // API call for signup
            const response = await axios.post('https://localhost:7108/api/Account/Register', {
                email: formData.email,
                firstName: formData.firstname,
                lastName: formData.lastname,
                gender: formData.gender,
                dialCode: formData.dialCode,
                phoneNumber: formData.phoneNumber,
                streetAddress: formData.streetAddress,
                password: formData.password,
                role: formData.role,
            });

            console.log('API Response:', response.data);

            if (response.status === 200) {
                setSuccess('Registration successful! Redirecting to login...');
                setTimeout(() => navigate('/login'), 2000); // Redirect to login page after 2 seconds
            }
        } catch (err) {
            // Improved error handling
            if (err.response) {
                setError(err.response.data?.message || 'Registration failed. Please try again.');
                console.error('Error Response:', err.response.data);
            } else if (err.request) {
                setError('No response from server. Please check your network connection.');
                console.error('Request Error:', err.request);
            } else {
                setError('Error: ' + err.message);
                console.error('Error Message:', err.message);
            }
        }
    };

    return (
        <div className="signup-container">
            <form className="signup-form" onSubmit={handleSignup}>
                <h2 className="signup-title">Sign Up</h2>

                {error && <p className="error-message">{error}</p>}
                {success && <p className="success-message">{success}</p>}

                <div className="input-group">
                    <input
                        type="text"
                        name="firstname"
                        value={formData.firstname}
                        onChange={handleChange}
                        placeholder="First Name"
                        className="signup-input"
                        required
                    />
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        name="lastname"
                        value={formData.lastname}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className="signup-input"
                        required
                    />
                </div>

                <div className="input-group">
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        className="signup-input"
                        required
                    />
                </div>

                <div className="input-group">
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="signup-input"
                        required
                    />
                </div>

                <div className="input-group">
                    <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        className="signup-input"
                        required
                    />
                </div>

                <div className="input-group">
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="signup-input"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        name="dialCode"
                        value={formData.dialCode}
                        onChange={handleChange}
                        placeholder="Dial Code"
                        className="signup-input"
                        required
                    />
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                        className="signup-input"
                        required
                    />
                </div>

                <div className="input-group">
                    <input
                        type="text"
                        name="streetAddress"
                        value={formData.streetAddress}
                        onChange={handleChange}
                        placeholder="Street Address"
                        className="signup-input"
                        required
                    />
                </div>

                <div className="input-group">
                    <select
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="signup-input"
                        required
                    >
                        <option value="">Select Role</option>
                        <option value="Customer">Customer</option>
                        <option value="Vendor">Vendor</option>
                    </select>
                </div>

                <button type="submit" className="signup-button">Register</button>

                <p className="text-center mt-4">
                    Already have an account? <Link to="/login" className="link-text">Login</Link>
                </p>
            </form>
        </div>
    );
};

export default Signup;
