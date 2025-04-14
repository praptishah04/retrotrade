import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const AddCategory = () => {
    const { register, handleSubmit, reset } = useForm();
    const navigate = useNavigate();

    const submitHandler = async (data) => {
        try {
            const res = await axios.post("/category/addcategory", data);
            console.log("Response:", res.data);
            alert("Category added successfully!");
            reset(); // Clear form
            navigate("/seller/viewcategories"); // Redirect after add
        } catch (error) {
            console.error("Error adding category:", error);
            alert("Failed to add category");
        }
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center bg-light">
            <div className="card shadow-sm border-0" style={{ width: '100%', maxWidth: '500px' }}>
                <div className="card-body p-5">
                    <h2 className="text-center mb-2">Add Category</h2>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        {/* Category Name */}
                        <div className="form-floating mb-4">
                            <input
                                type="text"
                                {...register("name")}
                                className="form-control"
                                id="name"
                                placeholder=" "
                                required
                            />
                            <label htmlFor="name">Category Name</label>
                        </div>

                        {/* Description */}
                        <div className="form-floating mb-4">
                            <textarea
                                {...register("description")}
                                className="form-control"
                                id="description"
                                placeholder=" "
                                style={{ height: '100px' }}
                                required
                            ></textarea>
                            <label htmlFor="description">Description</label>
                        </div>

                        {/* Status */}
                        <div className="mb-4">
                            <label htmlFor="status" className="form-label">Status</label>
                            <select
                                {...register("status")}
                                className="form-select"
                                id="status"
                                required
                            >
                                <option value="">Select Status</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>
                        </div>

                        {/* Submit Button */}
                        <div className="d-grid">
                            <button
                                type="submit"
                                className="btn btn-success btn-lg"
                            >
                                Add Category
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
