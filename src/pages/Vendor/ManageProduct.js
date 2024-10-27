import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../assets/styles/ManageProduct.css';

const ManageProduct = () => {
  const [product, setProduct] = useState({
    productId: 0,
    name: '',
    description: '',
    category: 'Unisex',
    price: '',
    stockCount: '',
  });
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]); // Store selected files
  const [imagePreviews, setImagePreviews] = useState([]); // Store image previews
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch product list with pagination
  const fetchProducts = async (pageNumber = 1) => {
    const token = localStorage.getItem('token');
    const response = await axios.get(`https://localhost:7108/api/Vendor/getProductList?pageNumber=${pageNumber}&pageSize=9`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setProducts(response.data.data.dataList);
    setCurrentPage(pageNumber);
    setTotalPages(response.data.data.totalPages);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      await axios.post('https://localhost:7108/api/Vendor/addOrUpdateProduct', product, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts(currentPage);
      setProduct({ productId: 0, name: '', description: '', category: 'Unisex', price: '', stockCount: '' });
      setIsEditing(false);
      setSelectedFiles([]); // Clear selected files
      setImagePreviews([]); // Clear image previews
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Get the single selected file
    if (file && selectedFiles.length < 4) {
      setSelectedFiles((prevFiles) => [...prevFiles, file]); // Store selected files
      setImagePreviews((prevPreviews) => [
        ...prevPreviews,
        URL.createObjectURL(file), // Create preview URL
      ]);
    }
  };

  const addPictures = async (prod) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('ProductId', prod.productId);

    selectedFiles.forEach((file) => {
      formData.append('ProductImage', file);
    });

    try {
      await axios.post('https://localhost:7108/api/Upload/upload', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Images uploaded successfully');
      fetchProducts(currentPage);
      setSelectedFiles([]); // Clear selected files after upload
      setImagePreviews([]); // Clear image previews after upload
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleEdit = (prod) => {
    setProduct(prod);
    setIsEditing(true);
    setSelectedFiles([]); // Clear selected files when editing
    setImagePreviews([]); // Clear image previews when editing
  };

  const handleDelete = async (productId) => {
    const token = localStorage.getItem('token');

    try {
      await axios.delete(`https://localhost:7108/api/Vendor/deleteProduct?productId=${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts(currentPage);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) fetchProducts(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) fetchProducts(currentPage + 1);
  };

  return (
    <div className="manage-product">
      <h1>Manage Products</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={product.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <select name="category" value={product.category} onChange={handleChange} required>
          <option value="Unisex">Unisex</option>
          <option value="Male">Men</option>
          <option value="Female">Women</option>
        </select>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="stockCount"
          value={product.stockCount}
          onChange={handleChange}
          placeholder="Stock Count"
          required
        />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <div className="image-previews">
          {imagePreviews.map((preview, index) => (
            <img key={index} src={preview} alt={`Preview ${index + 1}`} className="image-preview" />
          ))}
        </div>
        <button type="button" onClick={() => addPictures(product)}>Upload Images</button>
        <button type="submit">{isEditing ? 'Update Product' : 'Add Product'}</button>
      </form>

      <h2>Product List</h2>
      <div className="card-container">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((prod) => (
            <div className="card" key={prod.productId}>
              {/* Display up to 4 images */}
              {[prod.image1, prod.image2, prod.image3, prod.image4].map(
                (image, index) =>
                  image && <img src={image} alt={`${prod.name} Image ${index + 1}`} key={index} />
              )}
              <h3>{prod.name}</h3>
              <p>{prod.description}</p>
              <div className="card-price">${prod.price}</div>
              <div>
                <button className="edit-button" onClick={() => handleEdit(prod)}>Edit</button>
                <button className="delete-button" onClick={() => handleDelete(prod.productId)}>Delete</button>
              </div>
            </div>
          ))
        ) : (
          <div>No products available.</div>
        )}
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageProduct;
