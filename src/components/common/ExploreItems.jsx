import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../../assets/exploreitems.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaSearch, FaShoppingCart, FaTimes, FaHeart, FaRegHeart, FaHome, FaList, FaFilter } from 'react-icons/fa';

const ExploreItems = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [favorites, setFavorites] = useState(new Set());
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate('/');
    toast.success('Logged out successfully!');
  };

  useEffect(() => {
    // axios.get('/product/getproduct')
    //   .then(response => {
    //     setProducts(response.data.data);
    //     const uniqueCategories = [...new Set(response.data.data.map(product => product.category))];
    //     setCategories(uniqueCategories);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     console.error('Error fetching products:', error);
    //     setError('Failed to fetch products. Please try again later.');
    //     setLoading(false);
    //   });

    //   axios.get('category/getcategory')
    // .then(response => {
    //   const categoryNames = response.data.data.map(category => category.name); // Assuming your category model has a 'name' field
    //   setCategories(categoryNames);
    // })
    // .catch(error => {
    //   console.error('Error fetching categories:', error);
    //   // Fallback to getting categories from products if the categories API fails
    //   axios.get('/product/getproduct')
    //     .then(response => {
    //       const uniqueCategories = [...new Set(response.data.data.map(product => product.category))];
    //       setCategories(uniqueCategories);
    //     });
    // });

    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch products and categories in parallel
        const [productsResponse, categoriesResponse] = await Promise.all([
          axios.get('/product/getproduct'),
          axios.get('/category/getcategory')
        ]);
        console.log('Loaded products:', productsResponse.data.data);

        
        setProducts(productsResponse.data.data);
        
        // Use categories from categories endpoint if available, otherwise fallback to product categories
        const categoriesFromAPI = categoriesResponse.data.data.map(c => c.name);
        console.log("Categories from API:", categoriesFromAPI); // ✅ Debug here
        if (categoriesFromAPI.length > 0) {
          setCategories(categoriesFromAPI);
        } else {
          const uniqueCategories = [...new Set(productsResponse.data.data.map(p => p.category))];
          setCategories(uniqueCategories);
        }
  
        const buyerId = localStorage.getItem('id');
        const userRole = localStorage.getItem('roles')?.toUpperCase();
      
        if (userRole === 'BUYER' && buyerId) {
          axios.get(`/wishlist/${buyerId}`)
            .then(response => {
              const wishlistProductIds = response.data.wishlist
  .filter(item => item.productId && item.productId._id)
  .map(item => item.productId._id);

            })
            .catch(error => {
              console.error('Error fetching wishlist:', error);
            });
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch products. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, []); // Properly closed useEffect
  

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
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

  const toggleFavorite = async (productId) => {
    const buyerId = localStorage.getItem('id');
    const userRole = localStorage.getItem('roles')?.toUpperCase();
  
    if (userRole !== 'BUYER') {
      navigate('/buyerlogin');
      return;
    }
  
    try {
      const newFavorites = new Set(favorites);
      
      if (newFavorites.has(productId)) {
        // Remove from wishlist
        await axios.delete('/wishlist/remove', {
          data: { buyerId, productId }
        });
        newFavorites.delete(productId);
        toast.success('Removed from wishlist!');
      } else {
        // Add to wishlist - use consistent endpoint format
        await axios.post('/wishlist/add', { 
          buyerId, 
          productId 
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        newFavorites.add(productId);
        toast.success('Added to wishlist!');
      }
      
      setFavorites(newFavorites);
    } catch (error) {
      console.error('Wishlist error:', error);
      toast.error(
        error.response?.data?.message || 
        error.message || 
        'Failed to update wishlist'
      );
    }
  };
  const navigateToWishlist = () => {
    const userRole = localStorage.getItem('roles')?.toUpperCase();
    if (userRole !== 'BUYER') {
      navigate('/buyerlogin');
      return;
    }
    navigate('/wishlist');
  };

  const navigateToCart = () => {
    const userRole = localStorage.getItem('roles')?.toUpperCase();
    if (userRole !== 'BUYER') {
      navigate('/buyerlogin');
      return;
    }
    navigate('/cart');
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleCategorySelect = (category) => {
    if (selectedCategory.toLowerCase() === category.toLowerCase()) {
      setSelectedCategory('');
    } else {
      setSelectedCategory(category);
    }
  };
  

  const filteredProducts = products.filter(product => {
    const matchesSearch = product?.name?.toLowerCase().includes(searchTerm.toLowerCase());
  
    const productCategoryName =
      product.categoryId?.name || product.category;
  
    const matchesCategory =
      !selectedCategory ||
      productCategoryName?.toLowerCase() === selectedCategory.toLowerCase();
  
    return matchesSearch && matchesCategory;
  });
  
  

  const indexOfLastProduct = currentPage * productsPerPage;
const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

const handleNextPage = () => {
  if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
};

const handlePrevPage = () => {
  if (currentPage > 1) setCurrentPage(prev => prev - 1);
};

const goToPage = (page) => {
  setCurrentPage(page);
};


  <ToastContainer
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
/>

  return (
    <div className="explore-items-container">
      <nav className="explore-navbar">
        <div className="navbar-left">
          <Link to="/" className="nav-link">
            <FaHome className="nav-icon" />
            <span>Home</span>
          </Link>
          {/* <Link to="/explore" className="nav-link active">
            <FaList className="nav-icon" />
            <span>Explore More</span>
          </Link> */}
        </div>
        <div className="navbar-right">
          <button className="nav-link" onClick={navigateToWishlist}>
            <div className="wishlist-icon-container">
              <FaHeart className="nav-icon" />
              {favorites.size > 0 && (
                <span className="wishlist-count">{favorites.size}</span>
              )}
            </div>
            <span>Wishlist</span>
          </button>
          <button className="nav-link" onClick={navigateToCart}>
            <div className="cart-icon-container">
              <FaShoppingCart className="nav-icon" />
            </div>
            <span>Cart</span>
          </button>
          <button className="nav-link logout-btn" onClick={handleLogout}>
    <span>Logout</span>
  </button>
        </div>
      </nav>

      <div className="search-section">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          <button className="filter-toggle" onClick={toggleFilters}>
            <FaFilter />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
  <div className="filter-dropdown">
    <h4>Categories</h4>
    <div className="category-buttons">
      <button
        className={`category-btn ${selectedCategory === '' ? 'active' : ''}`}
        onClick={() => {
          setSelectedCategory('');
          setShowFilters(false); // ✅ Close filter after selecting
        }}
      >
        All Categories
      </button>

      {categories.map(category => (
        <button
          key={category}
          className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
          onClick={() => {
            handleCategorySelect(category);
            setShowFilters(false); // ✅ Close filter after selecting
          }}
        >
          {category || 'Uncategorized'}
        </button>
      ))}
    </div>
  </div>
)}

      </div>

      <div className="results-header">
        <h2>Featured Products</h2>
        <div className="results-count">
          {/* {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'} found */}
          {selectedCategory && ` in ${selectedCategory}`}
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
        <div className="product-grid">
          {currentProducts.map(product => (
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
                     Add to Cart
                  </button> 
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

{filteredProducts.length > productsPerPage && (
  <div className="pagination">
    <button 
      onClick={handlePrevPage} 
      disabled={currentPage === 1}
      className="pagination-btn"
    >
      Prev
    </button>

    {[...Array(totalPages)].map((_, index) => {
      const pageNum = index + 1;
      return (
        <button
          key={pageNum}
          onClick={() => goToPage(pageNum)}
          className={`pagination-btn ${pageNum === currentPage ? 'active' : ''}`}
        >
          {pageNum}
        </button>
      );
    })}

    <button 
      onClick={handleNextPage} 
      disabled={currentPage === totalPages}
      className="pagination-btn"
    >
      Next
    </button>
  </div>
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
                    In Stock
                    {/* In Stock ({selectedProduct.stock || 'N/A'} left) */}
                  </span>
                </div>
              </div>
              <button 
                className="modal-add-to-cart"
                onClick={() => handleAddToCart(selectedProduct)}
              >
                Add To Cart
                {/* <FaShoppingCart /> Add to Cart */}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExploreItems;