import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState, useEffect } from 'react';
 import { useNavigate } from 'react-router-dom';
// import './styles.css'; // Custom CSS for floating labels and animations

export const AddProduct = () => {
    const [addedcategory, setaddedcategory] = useState([]);
    const [addedsubcategories, setaddedsubcategories] = useState([]);

    const getCategory = async () => {
        const res = await axios.get("/category/getcategory");
        console.log(res.data);
        setaddedcategory(res.data.data);
    };

    const getsubCategoryByCategoryId = async (id) => {
        const res = await axios.get(`/subcategory/getsubcategorybycategory/${id}`);
        console.log("subcategory response", res.data);
        setaddedsubcategories(res.data.data);
    };

    useEffect(() => {
        getCategory();
    }, []);

    const { register, handleSubmit } = useForm();
    const navigate = useNavigate(); 
    const submitHandler = async (data) => {
        const sellerId = localStorage.getItem("id")
        data.sellerId = sellerId;
       

        console.log(data.image[0]) //array -->0th index access..

        const formData = new FormData();
        formData.append("name",data.name);
        formData.append("description",data.description);
        formData.append("price",data.price);
        formData.append("categoryId",data.categoryId);
        formData.append("status",data.status);
        formData.append("image",data.image[0]);
        formData.append("subcategoryId",data.subcategoryId);
        formData.append("sellerId",data.sellerId);
        formData.append("condition",data.condition);
        formData.append("listing_date",data.listing_date);
    
    
        //const res = await axios.post("/hording/add", data);
        const res = await axios.post("/product/addWithFile", formData);
        console.log(res); //axios
        console.log(res.data); //api response
        //if else...
        navigate("/seller/viewproduct")
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow-sm border-0" style={{ width: '100%', maxWidth: '500px' }}>
                <div className="card-body p-5">
                    <h2 className="text-center mb-2">Add Product</h2>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        {/* Name Field */}
                        <div className="form-floating mb-4">
                            <input
                                type="text"
                                {...register("name")}
                                className="form-control"
                                id="name"
                                placeholder=" "
                            />
                            <label htmlFor="name">Name</label>
                        </div>

                        {/* Description Field */}
                        <div className="form-floating mb-4">
                            <textarea
                                {...register("description")}
                                className="form-control"
                                id="description"
                                placeholder=" "
                                style={{ height: '100px' }}
                            ></textarea>
                            <label htmlFor="description">Description</label>
                        </div>

                        {/* Price Field */}
                        <div className="form-floating mb-4">
                            <input
                                type="text"
                                {...register("price")}
                                className="form-control"
                                id="price"
                                placeholder=" "
                            />
                            <label htmlFor="price">Price</label>
                        </div>

                        {/* Image URL Field */}
                        {/* <div className="form-floating mb-4">
                            <input
                                type="text"
                                {...register("imageURL")}
                                className="form-control"
                                id="imageURL"
                                placeholder=" "
                            />
                            <label htmlFor="imageURL">Image URL</label>
                        </div> */}

                        {/* Category Dropdown */}
                        <div className="mb-4">
                            <label htmlFor="categoryId" className="form-label">Select Category</label>
                            <select
                                {...register("categoryId")}
                                onChange={(event) => {
                                    getsubCategoryByCategoryId(event.target.value);
                                }}
                                className="form-select"
                                id="categoryId"
                            >
                                <option value="">Select Category</option>
                                {addedcategory?.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Subcategory Dropdown */}
                        <div className="mb-4">
                            <label htmlFor="subcategoryId" className="form-label">Select Subcategory</label>
                            <select
                                {...register("subcategoryId")}
                                className="form-select"
                                id="subcategoryId"
                            >
                                <option value="">Select Subcategory</option>
                                {addedsubcategories?.map((subcategory) => (
                                    <option key={subcategory._id} value={subcategory._id}>
                                        {subcategory.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Select image  URL</label>
                            <input type="file" {...register("image")}></input>
                        </div>

                        {/* Submit Button */}
                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-primary btn-lg"
                            >
                                Add Product
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};