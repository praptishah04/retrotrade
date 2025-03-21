import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/exploreitems.css';
import { FaSearch } from 'react-icons/fa';

const ExploreItems = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch products from the API
  useEffect(() => {
    axios.get('/product/getproduct') // Ensure this is the correct endpoint
      .then(response => {
        setProducts(response.data.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      });
  }, []);

  // Handle product click to view details
  const handleProductClick = (productId) => {
    navigate(`/productdetails/${productId}`);
  };

  // Handle add to cart
  const handleAddToCart = async (product) => {
    const buyerId = localStorage.getItem('id');
    const userRole = localStorage.getItem('role');
    if (userRole !== 'BUYER') {
      navigate('/buyerlogin');
      return;
    }

    try {
      let price = product.price; // Initialize price

      if (typeof price === 'string') {
        price = parseFloat(price.replace('₹', ''));
      } else if (typeof price === 'number') {
        // Price is already a number, no need to replace
      } else {
        console.error('Invalid product price:', product.price);
        alert('Invalid product price.');
        return; // Stop execution
      }

      const response = await axios.post('/cart/addcart', {
        buyerId: buyerId,
        productId: product._id,
        productPrice: price, // Use the parsed price
        quantity: 1,
      });
      navigate('/cart', { state: { productId: product._id } });
    } catch (error) {
      alert('Error adding to cart: ' + (error?.message || error));
    }
  };

  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explore-items-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Discover Amazing Products</h1>
        <p>Explore our curated collection of high-quality items.</p>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
      </div>

      {/* Loading and Error Handling */}
      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map(product => (
            <div key={product._id} className="product-card">
              <img
                src={product.imageURL}
                alt={product.name}
                onClick={() => handleProductClick(product._id)}
              />
              <h3>{product.name}</h3>
              <p>₹{product.price}</p>
              <button
                className="view-details-button"
                onClick={() => handleProductClick(product._id)}
              >
                View Details
              </button>
              <button
                className="add-to-cart-button"
                onClick={() => handleAddToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreItems;