import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../assets/exploreitems.css';
import { FaSearch, FaShoppingCart, FaTimes, FaStar, FaRegStar, FaHeart, FaRegHeart } from 'react-icons/fa';
import { IoIosArrowForward } from 'react-icons/io';

const ExploreItems = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [activeCategory, setActiveCategory] = useState('All');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/product/getproduct')
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

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = async (product) => {
  const buyerId = localStorage.getItem('id');
  const userRole = localStorage.getItem('roles')?.toUpperCase(); // Ensure case-insensitive check

  if (userRole !== 'BUYER') {
    navigate('/buyerlogin');
    return;
  }

  try {
    let price = product.price;
    if (typeof price === 'string') {
      price = parseFloat(price.replace('₹', ''));
    } else if (typeof price !== 'number') {
      alert('Invalid product price.');
      return;
    }

    await axios.post('/cart/addcart', {
      buyerId: buyerId,
      productId: product._id,
      productPrice: price,
      quantity: 1,
    });

    navigate('/cart', { state: { productId: product._id } });
  } catch (error) {
    alert('Error adding to cart: ' + (error?.message || error));
  }
};


  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
  };

  const categories = ['All', ...new Set(products.map(product => product.category))];
  
  const filteredProducts = products.filter(product =>
    product?.name?.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (activeCategory === 'All' || product.category === activeCategory)
  );

  const renderRatingStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating || 0);
    const hasHalfStar = (rating || 0) % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="star filled" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FaStar key={i} className="star half-filled" />);
      } else {
        stars.push(<FaRegStar key={i} className="star" />);
      }
    }
    
    return stars;
  };

  return (
    <div className="explore-items-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>Discover Amazing Products</h1>
          <p>Explore our curated collection of high-quality items for every need</p>
          <div className="hero-cta">
            <button className="cta-button">Shop Now <IoIosArrowForward /></button>
          </div>
        </div>
      </div>

      <div className="search-filter-container">
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
        
        <div className="category-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`category-btn ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading amazing products...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <div className="error-icon">!</div>
          <p>{error}</p>
          <button className="retry-button" onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : (
        <>
          <div className="results-count">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
          </div>
          
          <div className="product-grid">
            {filteredProducts.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image-container">
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    onClick={() => handleProductClick(product)}
                  />
                  <button 
                    className="favorite-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product._id);
                    }}
                  >
                    {favorites.has(product._id) ? <FaHeart className="favorite-icon filled" /> : <FaRegHeart className="favorite-icon" />}
                  </button>
                  {product.discount && (
                    <div className="discount-badge">-{product.discount}%</div>
                  )}
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <div className="product-meta">
                    <div className="rating">
                      {renderRatingStars(product.rating)}
                      <span>({product.reviews || 0})</span>
                    </div>
                    <p className="price">
                      {product.originalPrice && (
                        <span className="original-price">₹{product.originalPrice}</span>
                      )}
                      <span>₹{product.price}</span>
                    </p>
                  </div>
                  <div className="product-actions">
                    <button
                      className="view-details-button"
                      onClick={() => handleProductClick(product)}
                    >
                      View Details
                    </button>
                     <button
                      className="add-to-cart-button"
                      onClick={() => handleAddToCart(product)}
                    >
                      <FaShoppingCart /> Add to Cart
                    </button> 
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

{selectedProduct && (
  <div className="modal-overlay" onClick={handleCloseModal}>
    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
      <button className="close-modal" onClick={handleCloseModal}><FaTimes /></button>
      <div className="modal-image-container">
        <img 
          src={selectedProduct.imageURL} 
          alt={selectedProduct.name}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = '/placeholder-product.jpg';
          }}
        />
      </div>
      <div className="modal-details">
        <h2>{selectedProduct.name || 'Product Name Not Available'}</h2>
        
        <div className="modal-price">
          ₹{selectedProduct.price?.toLocaleString() || 'Price Not Available'}
        </div>
        
        <p className="modal-description">
          {selectedProduct.description || 'No description available'}
        </p>
        
        <div className="modal-specs">
          <div className="spec-item">
            <span className="spec-label">Category:</span>
            <span>{selectedProduct.category || 'Not specified'}</span>
          </div>
          <div className="spec-item">
            <span className="spec-label">Availability:</span>
            <span className="in-stock">
              In Stock ({selectedProduct.stock || 'N/A'} left)
            </span>
          </div>
        </div>
        
        <button 
          className="modal-add-to-cart"
          onClick={() => handleAddToCart(selectedProduct)}
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  </div>
)}
      {/* )} */}
    </div>
  );
};

export default ExploreItems;