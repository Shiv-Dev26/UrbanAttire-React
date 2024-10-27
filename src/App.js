// src/App.js
import React, { useState, useEffect } from 'react'; // Ensure useEffect is imported
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import AppRoutes from './routes/AppRoutes'; // Import your routes

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userRole, setUserRole] = useState('');
    const [cart, setCart] = useState([]); // Use lowercase for cart

    useEffect(() => {
        const storedUserRole = localStorage.getItem('userRole');
        const userId = localStorage.getItem('userId');

        if (storedUserRole && userId) {
            setUserRole(storedUserRole);
            setIsAuthenticated(true); // Assuming user is authenticated if userId exists
        }
    }, []);

    const handleLogout = () => {
        // Clear user session data
        localStorage.removeItem('userId');
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userRole');
        localStorage.removeItem('token');
        setIsAuthenticated(false);
        setUserRole(''); // Clear user role on logout
    };

    const addToCart = (product) => {
        setCart((prevCart) => {
            const existingItem = prevCart.find(item => item.productId === product.productId);
            if (existingItem) {
                // If the product exists, increase the quantity
                return prevCart.map(item =>
                    item.productId === product.productId
                        ? { ...item, quantity: item.quantity + product.quantity } // Increment quantity
                        : item
                );
            }
            // If the product does not exist, add it to the cart
            return [...prevCart, { ...product, quantity: product.quantity }]; // Add new product with specified quantity
        });
    };

    return (
        <Router>
            <div className="App">
                <Navbar 
                    isAuthenticated={isAuthenticated} 
                    userRole={userRole} 
                    handleLogout={handleLogout} // Pass handleLogout to Navbar
                />
                <main className="main-content"> {/* Main content wrapper */}
                    <AppRoutes 
                        isAuthenticated={isAuthenticated} 
                        userRole={userRole} 
                        handleLogout={handleLogout} // Pass handleLogout to AppRoutes
                        addToCart={addToCart} // Pass addToCart to routes
                        cart={cart} // Pass cart if needed in routes
                    />
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
