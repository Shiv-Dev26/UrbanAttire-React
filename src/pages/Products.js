import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import '../assets/styles/common.css'; // Assuming you have a CSS file for styling

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all'); // Ensure this state is used
    const [sortOption, setSortOption] = useState('default');
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const token = localStorage.getItem('token');

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            let response;

            const userRole = localStorage.getItem('userRole');

            const params = {
                pageNumber,
                pageSize: 9, // Set page size to 9
                searchQuery: searchQuery.trim(),
                sortOption,
               category: selectedCategory.toLowerCase() === 'all' ? '' : selectedCategory.toLowerCase(), 
            };

            if (userRole === 'Vendor') {
                response = await axios.get('https://localhost:7108/api/Vendor/getProductList', {
                    headers: { Authorization: `Bearer ${token}` },
                    params,
                });
            } else if (userRole === 'Customer') {
                response = await axios.get('https://localhost:7108/api/Customer/customerProductList', {
                    headers: { Authorization: `Bearer ${token}` },
                    params,
                });
            }
            
            setProducts(response.data.data.dataList);
            setTotalPages(Math.ceil(response.data.data.totalCount / 9)); // Update total pages based on page size 9
        } catch (err) {
            console.error('Error fetching product list:', err);
            setError('Failed to load products. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [searchQuery, selectedCategory, sortOption, pageNumber]); // Update to use selectedCategory

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setPageNumber(1);
    };

    const handleCategoryChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue); // Update selectedCategory
        setPageNumber(1); // Reset to first page on category change
    };

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
        setPageNumber(1); // Reset to first page on sort change
    };

    return (
        <div className="products-container">
            <div className="sidebar">
                <h2>Filters</h2>
                <div>
                    <h3>Categories</h3>
                    <select onChange={handleCategoryChange} value={selectedCategory}> {/* Use selectedCategory */}
                        <option value="all">All</option>
                        <option value="Male">Men</option>
                        <option value="Female">Women</option>
                        <option value="Unisex">Unisex</option>
                    </select>
                </div>
                <div>
                    <h3>Sort By</h3>
                    <select onChange={handleSortChange} value={sortOption}>
                        <option value="default">Default</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                    </select>
                </div>
            </div>

            <div className="products-content">
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>{error}</p>
                ) : products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <div className="product-list">
                        {products.map((product) => (
                            <div key={product.productId} className="product-item">
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                )}

                <div className="pagination">
                    <button
                        onClick={() => setPageNumber((prev) => Math.max(prev - 1, 1))}
                        disabled={pageNumber === 1}
                    >
                        Previous
                    </button>
                    <span>
                        Page {pageNumber} of {totalPages}
                    </span>
                    <button
                        onClick={() => setPageNumber((prev) => Math.min(prev + 1, totalPages))}
                        disabled={pageNumber === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Products;
