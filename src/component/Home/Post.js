import React, { useContext, useState } from "react";
import ProfileContext from "./ProfileContext";
import { useNavigate } from "react-router-dom";
export default function Post() {
    const navigate = useNavigate();
    const {prodata} = useContext(ProfileContext);
    const [product, setProduct] = useState([]);
    const ProductImageUpload = (e) => {
        const files = Array.from(e.target.files);
        setProduct(files);
        console.log(files);
      };

      const AddProduct = async () => {
        const token = localStorage.getItem("token");
        try {
          const ProductForm = new FormData();
          ProductForm.append("id", prodata._id);
          product.forEach((img) => {
            ProductForm.append("Productimages", img);
          });
    
          const response = await fetch("http://localhost:5000/product", {
            method: "POST",
            body: ProductForm,
            headers: {
              "auth-token": token,
            },
          });
    
          const result = await response.json();
          if (result) {
            console.log(result);    
            navigate("/markethub");
          } else {
            console.error("Error:", result);
            alert(result.error || "An error occurred");
          }
        } catch (error) {
          console.log("Error adding product:", error);
        }
      };    
  return (
    <>
      <div className="post">
        <div>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={ProductImageUpload}
          />
        </div>
        <div><button onClick={AddProduct}>Post</button></div>
      </div>
    </>
  );
}
