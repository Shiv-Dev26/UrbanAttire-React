// src/routes/AppRoutes.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Products from '../pages/Products';
import Cart from '../pages/Customer/Cart';
import Profile from '../pages/Profile/Profile';
import ProductDetails from '../pages/ProductDetails';
import ManageProducts from '../pages/Vendor/ManageProduct';
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import OrderList from '../pages/Customer/OrderList'; // Import OrderList
import OrderDetail from '../pages/Customer/OrderDetail'; // Import OrderDetail

const AppRoutes = ({ userRole, isAuthenticated, handleLogout, setIsAuthenticated, setUserRole, addToCart, cart }) => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products addToCart={addToCart} />} />
            <Route path="/product/:productId" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
            
            {isAuthenticated && userRole === 'Customer' && (
                <>
                    <Route path="/cart" element={<Cart cart={cart} />} />
                    <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
                    <Route path="/order" element={<OrderList />} /> {/* Route for order list */}
                    <Route path="/order/:orderId" element={<OrderDetail />} /> {/* Route for order detail */}
                </>
            )}
            {isAuthenticated && userRole === 'Vendor' && (
                <>
                    <Route path="/manage-products" element={<ManageProducts />} />
                    <Route path="/profile" element={<Profile handleLogout={handleLogout} />} />
                </>
            )}
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} setUserRole={setUserRole} />} />
            <Route path="/signup" element={<Signup />} />
        </Routes>
    );
};

export default AppRoutes;
