import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../../assets/landing/css/wishlist.css" // Create this CSS file

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const buyerId = localStorage.getItem('id');
        if (!buyerId) {
          setError('Please login to view your wishlist');
          setLoading(false);
          return;
        }

        const response = await axios.get(`/wishlist/${buyerId}`);
        setWishlistItems(response.data.wishlist);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch wishlist');
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  const removeFromWishlist = async (productId) => {
    try {
      const buyerId = localStorage.getItem('id');
      await axios.delete('/wishlist/remove', {
        data: { buyerId, productId }
      });
      
      setWishlistItems(wishlistItems.filter(item => item.productId?._id !== productId));
      toast.success('Removed from wishlist!');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  const handleAddToCart = async (product) => {
    const buyerId = localStorage.getItem('id');
    const userRole = localStorage.getItem('roles')?.toUpperCase();

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
        productprice: price,
        quantity: 1,
      });

      navigate('/cart', { state: { productId: product._id } });
    } catch (error) {
      alert('Error adding to cart: ' + (error?.message || error));
    }
  };

  const openProductPopup = (product) => {
    setSelectedProduct(product);
  };

  const closeProductPopup = () => {
    setSelectedProduct(null);
  };

  if (loading) {
    return <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Loading your wishlist...</p>
    </div>;
  }

  if (error) {
    return <div className="error-message">
      <p>{error}</p>
      <Link to="/login" className="login-link">Login Now</Link>
    </div>;
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>Your Wishlist</h1>
        <p>{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}</p>
      </div>
      
      {wishlistItems.length === 0 ? (
        <div className="empty-wishlist">
          <div className="empty-heart-icon">
            <FaHeart />
          </div>
          <h3>Your wishlist is empty</h3>
          <p>Start adding items you love</p>
          <Link to="/exploreitems" className="explore-button">Explore Products</Link>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistItems?.map((item) => (
            <div key={item._id} className="wishlist-card">
              <div 
                className="product-image"
                onClick={() => openProductPopup(item?.productId)}
              >
                <img 
                  src={item.productId?.imageURL} 
                  alt={item.productId?.name} 
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/placeholder-product.jpg';
                  }}
                />
                <button 
                  className="remove-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFromWishlist(item?.productId?._id);
                  }}
                >
                  <FaTimes />
                </button>
              </div>
              
              <div className="product-info">
                <h3 onClick={() => openProductPopup(item?.productId)}>
                  {item?.productId?.name}
                </h3>
                <p className="price">₹{item.productId?.price}</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(item?.productId)}
                >
                    Add To Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Product Popup Modal */}
      {selectedProduct && (
        <div className="product-modal-overlay" onClick={closeProductPopup}>
          <div className="product-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeProductPopup}>
              <FaTimes />
            </button>
            
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
              <h2>{selectedProduct.name}</h2>
              <p className="modal-price">₹{selectedProduct.price}</p>
              <p className="modal-description">
                {selectedProduct.description || 'No description available'}
              </p>
              
              <div className="modal-actions">
                <button 
                  className="modal-remove-btn"
                  onClick={() => {
                    removeFromWishlist(selectedProduct?._id);
                    closeProductPopup();
                  }}
                >
                  <FaHeart /> Remove from Wishlist
                </button>
                
                <button 
                  className="modal-add-to-cart-btn"
                  onClick={() => {
                    handleAddToCart(selectedProduct);
                    closeProductPopup();
                  }}
                >
                  <FaShoppingCart /> Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Wishlist;