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

  useEffect(() => {
    axios.get('product/getproduct')
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

  const handleProductClick = (buyerId) => {
    navigate(`/productdetails/${buyerId}`);
  };

  const filteredProducts = products.filter(product =>
    product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="explore-items-container">
      <div className="hero-section">
        <h1>Discover Amazing Products</h1>
        <p>Explore our curated collection of high-quality items.</p>
      </div>

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

      {loading ? (
        <div className="loading-spinner">Loading...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="product-list">
          {filteredProducts.map(product => (
            <div key={product._id} className="product-card" onClick={() => handleProductClick(product._id)}>
              <div className="product-image-container">
                <img src={product.imageURL} alt={product.name} className="product-image" />
                <div className="image-overlay"></div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="product-price">₹{product.price}</p>
                <button className="view-details-button">View Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExploreItems;