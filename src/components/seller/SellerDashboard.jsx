import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SellerDashboard = () => {
    const [activeComponent, setActiveComponent] = useState('addProduct');
    const [addedcategory, setAddedcategory] = useState([]);
    const [addedsubcategories, setAddedsubcategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [allSubcategories, setAllSubcategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const navigate = useNavigate();

    // Fetch categories
    const getCategory = async () => {
        try {
            const res = await axios.get("/category/getcategory");
            setAddedcategory(res.data.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
            alert("Failed to fetch categories");
        }
    };

    // Fetch subcategories by category ID
    const getsubCategoryByCategoryId = async (id) => {
        try {
            const res = await axios.get(`/subcategory/getsubcategorybycategory/${id}`);
            setAddedsubcategories(res.data.data);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    // Fetch all subcategories
    const getAllSubcategories = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/subcategory/getsubcategory");
            setAllSubcategories(res.data.data);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
            alert("Failed to fetch subcategories");
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch products by user ID
    const getAllMyProducts = async () => {
        setIsLoading(true);
        try {
            const res = await axios.get("/product/getProductsbyuserid/" + localStorage.getItem("id"));
            setProducts(res.data.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            alert("Failed to fetch products");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getCategory();
        if (activeComponent === 'viewProducts') {
            getAllMyProducts();
        }
        if (activeComponent === 'viewSubcategories') {
            getAllSubcategories();
        }
    }, [activeComponent]);

    const submitHandler = async (data) => {
        setIsLoading(true);
        const sellerId = localStorage.getItem("id");
        data.sellerId = sellerId;
    
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", data.price);
        formData.append("categoryId", data.categoryId);
        formData.append("status", data.status);
        formData.append("image", data.image[0]);
        formData.append("subcategoryId", data.subcategoryId);
        formData.append("sellerId", sellerId);
        formData.append("condition", data.condition);
        formData.append("listing_date", data.listing_date);
    
        try {
            await axios.post("/product/addWithFile", formData);
            alert("Product added successfully!");
            // Change this line to navigate to the viewProducts component
            setActiveComponent('viewProducts');
            // Also refresh the products list
            getAllMyProducts();
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product");
        } finally {
            setIsLoading(false);
        }
    };

    const addCategoryHandler = async (data) => {
        setIsLoading(true);
        try {
            await axios.post("/category/addcategory", data);
            alert("Category added successfully!");
            getCategory(); // Refresh categories list
            reset(); // Reset form
            setActiveComponent('viewCategories'); // Navigate to view
        } catch (error) {
            console.error("Error adding category:", error);
            alert(error.response?.data?.message || "Failed to add category");
        } finally {
            setIsLoading(false);
        }
    };

   const addSubcategoryHandler = async (data) => {
    setIsLoading(true);
    try {
        const res = await axios.post("/subcategory/addsubcategory", data);
        alert("Subcategory added successfully!");
        setActiveComponent('viewSubcategories');
        getAllSubcategories();
        reset();
    } catch (error) {
        console.error("Error adding subcategory:", error);
        // Show proper error message instead of [object Object]
        alert(error.response?.data?.message || "Failed to add subcategory");
    } finally {
        setIsLoading(false);
    }
};

    const renderComponent = () => {
        switch (activeComponent) {
            case 'addProduct':
                return (
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '30px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>Add Product</h2>
                        <form onSubmit={handleSubmit(submitHandler)} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', color: '#495057', fontWeight: '500' }}>Name*</label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Name is required" })}
                                    style={{
                                        padding: '10px 15px',
                                        borderRadius: '4px',
                                        border: errors.name ? '1px solid red' : '1px solid #ced4da',
                                        fontSize: '16px',
                                    }}
                                />
                                {errors.name && <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.name.message}</span>}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', color: '#495057', fontWeight: '500' }}>Description*</label>
                                <textarea
                                    {...register("description", { required: "Description is required" })}
                                    style={{
                                        padding: '10px 15px',
                                        borderRadius: '4px',
                                        border: errors.description ? '1px solid red' : '1px solid #ced4da',
                                        fontSize: '16px',
                                        height: '100px'
                                    }}
                                />
                                {errors.description && <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.description.message}</span>}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', color: '#495057', fontWeight: '500' }}>Price*</label>
                                <input
                                    type="number"
                                    {...register("price", { required: "Price is required" })}
                                    style={{
                                        padding: '10px 15px',
                                        borderRadius: '4px',
                                        border: errors.price ? '1px solid red' : '1px solid #ced4da',
                                        fontSize: '16px',
                                    }}
                                />
                                {errors.price && <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.price.message}</span>}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', color: '#495057', fontWeight: '500' }}>Select Category*</label>
                                <select
                                    {...register("categoryId", { required: "Category is required" })}
                                    onChange={(e) => getsubCategoryByCategoryId(e.target.value)}
                                    style={{
                                        padding: '10px 15px',
                                        borderRadius: '4px',
                                        border: errors.categoryId ? '1px solid red' : '1px solid #ced4da',
                                        fontSize: '16px',
                                    }}
                                >
                                    <option value="">Select Category</option>
                                    {addedcategory?.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoryId && <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.categoryId.message}</span>}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', color: '#495057', fontWeight: '500' }}>Select Subcategory*</label>
                                <select
                                    {...register("subcategoryId", { required: "Subcategory is required" })}
                                    style={{
                                        padding: '10px 15px',
                                        borderRadius: '4px',
                                        border: errors.subcategoryId ? '1px solid red' : '1px solid #ced4da',
                                        fontSize: '16px',
                                    }}
                                >
                                    <option value="">Select Subcategory</option>
                                    {addedsubcategories?.map((subcategory) => (
                                        <option key={subcategory._id} value={subcategory._id}>
                                            {subcategory.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.subcategoryId && <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.subcategoryId.message}</span>}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', color: '#495057', fontWeight: '500' }}>Product Image*</label>
                                <input
                                    type="file"
                                    {...register("image", { required: "Image is required" })}
                                    style={{
                                        padding: '10px 15px',
                                        borderRadius: '4px',
                                        border: errors.image ? '1px solid red' : '1px solid #ced4da',
                                        fontSize: '16px',
                                    }}
                                    accept="image/*"
                                />
                                {errors.image && <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.image.message}</span>}
                            </div>

                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#f39c12',
                                    padding: '12px 20px',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    transition: 'background-color 0.3s',
                                    opacity: isLoading ? 0.7 : 1,
                                    pointerEvents: isLoading ? 'none' : 'auto'
                                }}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Adding...' : 'Add Product'}
                            </button>
                        </form>
                    </div>
                );

            case 'viewProducts':
                return (
                    <div style={{ margin: '20px 0' }}>
                        <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#2c3e50' }}>My Products</h2>
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                backgroundColor: 'white',
                            }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#ecf0f1' }}>
                                        <th style={{
                                            padding: '12px 15px',
                                            textAlign: 'left',
                                            fontWeight: 'bold',
                                            color: '#2c3e50',
                                            borderBottom: '2px solid #ddd',
                                        }}>Product Name</th>
                                        <th style={{
                                            padding: '12px 15px',
                                            textAlign: 'left',
                                            fontWeight: 'bold',
                                            color: '#2c3e50',
                                            borderBottom: '2px solid #ddd',
                                        }}>Image</th>
                                        <th style={{
                                            padding: '12px 15px',
                                            textAlign: 'left',
                                            fontWeight: 'bold',
                                            color: '#2c3e50',
                                            borderBottom: '2px solid #ddd',
                                        }}>Price</th>
                                        <th style={{
                                            padding: '12px 15px',
                                            textAlign: 'left',
                                            fontWeight: 'bold',
                                            color: '#2c3e50',
                                            borderBottom: '2px solid #ddd',
                                        }}>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.length > 0 ? (
                                        products.map((product) => (
                                            <tr key={product._id} style={{
                                                borderBottom: '1px solid #ddd',
                                                '&:hover': {
                                                    backgroundColor: '#f5f5f5',
                                                }
                                            }}>
                                                <td style={{ padding: '12px 15px', color: '#495057' }}>{product.name}</td>
                                                <td style={{ padding: '12px 15px', color: '#495057' }}>
                                                    <img 
                                                        style={{ 
                                                            width: '60px', 
                                                            height: '60px', 
                                                            objectFit: 'cover', 
                                                            borderRadius: '4px' 
                                                        }} 
                                                        src={product?.imageURL} 
                                                        alt={product.name}
                                                    />
                                                </td>
                                                <td style={{ padding: '12px 15px', color: '#495057' }}>₹{product.price}</td>
                                                <td style={{ padding: '12px 15px', color: '#495057' }}>
                                                    <span style={product.status === 'active' ? 
                                                        { color: 'green', fontWeight: 'bold' } : 
                                                        { color: 'red', fontWeight: 'bold' }}>
                                                        {product.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>
                                                No products found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'addCategory':
                return (
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '30px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>Add Category</h2>
                        <form onSubmit={handleSubmit(addCategoryHandler)} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', color: '#495057', fontWeight: '500' }}>Category Name*</label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Category name is required" })}
                                    style={{
                                        padding: '10px 15px',
                                        borderRadius: '4px',
                                        border: errors.name ? '1px solid red' : '1px solid #ced4da',
                                        fontSize: '16px',
                                    }}
                                />
                                {errors.name && <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.name.message}</span>}
                            </div>

                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#f39c12',
                                    padding: '12px 20px',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    transition: 'background-color 0.3s',
                                    opacity: isLoading ? 0.7 : 1,
                                    pointerEvents: isLoading ? 'none' : 'auto'
                                }}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Adding...' : 'Add Category'}
                            </button>
                        </form>
                    </div>
                );

            case 'viewCategories':
                return (
                    <div style={{ margin: '20px 0' }}>
                        <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#2c3e50' }}>Categories</h2>
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                backgroundColor: 'white',
                            }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#ecf0f1' }}>
                                        <th style={{
                                            padding: '12px 15px',
                                            textAlign: 'left',
                                            fontWeight: 'bold',
                                            color: '#2c3e50',
                                            borderBottom: '2px solid #ddd',
                                        }}>Category Name</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {addedcategory?.length > 0 ? (
                                        addedcategory.map((category) => (
                                            <tr key={category._id} style={{
                                                borderBottom: '1px solid #ddd',
                                                '&:hover': {
                                                    backgroundColor: '#f5f5f5',
                                                }
                                            }}>
                                                <td style={{ padding: '12px 15px', color: '#495057' }}>{category.name}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td style={{ textAlign: 'center', padding: '20px' }}>
                                                No categories found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            case 'addSubcategory':
                return (
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '30px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                        maxWidth: '600px',
                        margin: '0 auto'
                    }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: '#2c3e50' }}>Add Subcategory</h2>
                        <form onSubmit={handleSubmit(addSubcategoryHandler)} style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '20px'
                        }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', color: '#495057', fontWeight: '500' }}>Subcategory Name*</label>
                                <input
                                    type="text"
                                    {...register("name", { required: "Subcategory name is required" })}
                                    style={{
                                        padding: '10px 15px',
                                        borderRadius: '4px',
                                        border: errors.name ? '1px solid red' : '1px solid #ced4da',
                                        fontSize: '16px',
                                    }}
                                />
                                {errors.name && <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.name.message}</span>}
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <label style={{ fontSize: '14px', color: '#495057', fontWeight: '500' }}>Category*</label>
                                <select
                                    {...register("categoryId", { required: "Category is required" })}
                                    style={{
                                        padding: '10px 15px',
                                        borderRadius: '4px',
                                        border: errors.categoryId ? '1px solid red' : '1px solid #ced4da',
                                        fontSize: '16px',
                                    }}
                                >
                                    <option value="">Select Category</option>
                                    {addedcategory?.map((category) => (
                                        <option key={category._id} value={category._id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                {errors.categoryId && <span style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{errors.categoryId.message}</span>}
                            </div>

                            <button
                                type="submit"
                                style={{
                                    backgroundColor: '#f39c12',
                                    padding: '12px 20px',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    fontSize: '16px',
                                    transition: 'background-color 0.3s',
                                    opacity: isLoading ? 0.7 : 1,
                                    pointerEvents: isLoading ? 'none' : 'auto'
                                }}
                                disabled={isLoading}
                            >
                                {isLoading ? 'Adding...' : 'Add Subcategory'}
                            </button>
                        </form>
                    </div>
                );

            case 'viewSubcategories':
                return (
                    <div style={{ margin: '20px 0' }}>
                        <h2 style={{ fontSize: '24px', marginBottom: '15px', color: '#2c3e50' }}>Subcategories</h2>
                        <div style={{ overflowX: 'auto', marginBottom: '20px' }}>
                            <table style={{
                                width: '100%',
                                borderCollapse: 'collapse',
                                boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                                backgroundColor: 'white',
                            }}>
                                <thead>
                                    <tr style={{ backgroundColor: '#ecf0f1' }}>
                                        <th style={{
                                            padding: '12px 15px',
                                            textAlign: 'left',
                                            fontWeight: 'bold',
                                            color: '#2c3e50',
                                            borderBottom: '2px solid #ddd',
                                        }}>Subcategory Name</th>
                                        <th style={{
                                            padding: '12px 15px',
                                            textAlign: 'left',
                                            fontWeight: 'bold',
                                            color: '#2c3e50',
                                            borderBottom: '2px solid #ddd',
                                        }}>Category</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {allSubcategories?.length > 0 ? (
                                        allSubcategories.map((subcategory) => (
                                            <tr key={subcategory._id} style={{
                                                borderBottom: '1px solid #ddd',
                                                '&:hover': {
                                                    backgroundColor: '#f5f5f5',
                                                }
                                            }}>
                                                <td style={{ padding: '12px 15px', color: '#495057' }}>{subcategory.name}</td>
                                                <td style={{ padding: '12px 15px', color: '#495057' }}>
                                                    {addedcategory.find(cat => cat._id === subcategory.categoryId)?.name}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="2" style={{ textAlign: 'center', padding: '20px' }}>
                                                No subcategories found
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );

            default:
                return <div style={{ padding: '20px' }}>Select a menu item</div>;
        }
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            fontFamily: 'Arial, sans-serif',
            backgroundColor: '#f8f9fa'
        }}>
            <div style={{
                width: '250px',
                backgroundColor: '#2c3e50',
                color: '#ecf0f1',
                padding: '20px 0',
                position: 'fixed',
                height: '100vh'
            }}>
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '30px',
                    color: '#f39c12',
                    fontSize: '24px'
                }}>Retro Trade</h2>
                <h3 style={{
                    padding: '0 20px',
                    marginBottom: '15px',
                    fontSize: '16px',
                    color: '#bdc3c7',
                }}>Seller Dashboard</h3>
                <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                }}>
                    <li 
                        style={activeComponent === 'addProduct' ? {
                            padding: '12px 20px',
                            cursor: 'pointer',
                            backgroundColor: '#34495e',
                            borderLeft: '4px solid #f39c12',
                        } : {
                            padding: '12px 20px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        }}
                        onClick={() => setActiveComponent('addProduct')}
                    >
                        Add Product
                    </li>
                    <li 
                        style={activeComponent === 'viewProducts' ? {
                            padding: '12px 20px',
                            cursor: 'pointer',
                            backgroundColor: '#34495e',
                            borderLeft: '4px solid #f39c12',
                        } : {
                            padding: '12px 20px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        }}
                        onClick={() => setActiveComponent('viewProducts')}
                    >
                        View Products
                    </li>
                    <li 
                        style={activeComponent === 'addCategory' ? {
                            padding: '12px 20px',
                            cursor: 'pointer',
                            backgroundColor: '#34495e',
                            borderLeft: '4px solid #f39c12',
                        } : {
                            padding: '12px 20px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        }}
                        onClick={() => setActiveComponent('addCategory')}
                    >
                        Add Category
                    </li>
                    <li 
                        style={activeComponent === 'viewCategories' ? {
                            padding: '12px 20px',
                            cursor: 'pointer',
                            backgroundColor: '#34495e',
                            borderLeft: '4px solid #f39c12',
                        } : {
                            padding: '12px 20px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        }}
                        onClick={() => setActiveComponent('viewCategories')}
                    >
                        View Categories
                    </li>
                    <li 
                        style={activeComponent === 'addSubcategory' ? {
                            padding: '12px 20px',
                            cursor: 'pointer',
                            backgroundColor: '#34495e',
                            borderLeft: '4px solid #f39c12',
                        } : {
                            padding: '12px 20px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        }}
                        onClick={() => setActiveComponent('addSubcategory')}
                    >
                        Add Subcategory
                    </li>
                    <li 
                        style={activeComponent === 'viewSubcategories' ? {
                            padding: '12px 20px',
                            cursor: 'pointer',
                            backgroundColor: '#34495e',
                            borderLeft: '4px solid #f39c12',
                        } : {
                            padding: '12px 20px',
                            cursor: 'pointer',
                            transition: 'background-color 0.3s',
                        }}
                        onClick={() => setActiveComponent('viewSubcategories')}
                    >
                        View Subcategories
                    </li>
                </ul>
            </div>
            <div style={{
                flex: 1,
                padding: '20px',
                marginLeft: '250px',
                backgroundColor: '#f8f9fa'
            }}>
                {renderComponent()}
            </div>
        </div>
    );
};

export default SellerDashboard;