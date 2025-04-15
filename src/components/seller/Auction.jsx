import React, { useEffect, useState } from "react";
import axios from "axios";

const Auction = () => {
  const [products, setProducts] = useState([]);
  const [auctionData, setAuctionData] = useState({
    productId: "",
    startingPrice: "",
    endTime: "",
  });

  useEffect(() => {
    // Fetch all products to display in dropdown
    axios
      .get("http://localhost:5173/api/product") // update if endpoint differs
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.error("Error fetching products", err);
      });
  }, []);

  const handleChange = (e) => {
    setAuctionData({
      ...auctionData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/auction/addauction", auctionData);
      alert("Auction created successfully!");
      console.log(response.data);
      setAuctionData({ productId: "", startingPrice: "", endTime: "" });
    } catch (err) {
      console.error("Failed to create auction", err);
      alert("Error creating auction");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "30px auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Create Auction</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label>Product:</label>
          <select
            name="productId"
            value={auctionData.productId}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          >
            <option value="">Select a product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>Starting Price:</label>
          <input
            type="number"
            name="startingPrice"
            value={auctionData.startingPrice}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <div style={{ marginBottom: "15px" }}>
          <label>End Time:</label>
          <input
            type="datetime-local"
            name="endTime"
            value={auctionData.endTime}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "8px" }}
          />
        </div>

        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#2980b9",
            color: "white",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
            width: "100%",
          }}
        >
          Create Auction
        </button>
      </form>
    </div>
  );
};

export default Auction;
