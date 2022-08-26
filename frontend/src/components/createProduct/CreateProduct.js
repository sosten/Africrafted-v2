import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import LoadingSpinner from "../utils/Loading";
import axios from "axios";

const initialState = {
  product_id: "",
  title: "",
  price: 0,
  description: "This is a description",
  content: "This is content",
  category: "",
};

const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const styleUpload = {
    display: images ? "block" : "none"
  }
  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" />
        <div id="file_img" style={{styleUpload}}>
          <img src="" alt="" />
          <span>x</span>
        </div>
        <form>
          <div className="row">
            <label htmlFor="product_id">Product ID</label>
            <input
              type="text"
              name="product_id"
              id="product_id"
              value={product.product_id}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              id="title"
              value={product.title}
              required
            />
          </div>
          <div className="row">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              id="price"
              value={product.price}
              required
            />
            </div>
            <div className="row">
                <label htmlFor="description">Description</label>
                <textarea
                    type="text"
                    name="description"
                    id="description"
                    value={product.description}
                    required
                    rows={10}
                />
            </div>
            <div className="row">
                <label htmlFor="content">Content</label>
                <textarea
                    type="text"
                    name="content"
                    id="content"
                    value={product.content}
                    required
                    rows={7}
                />
            </div>
            <div className="row">
                <label htmlFor="categories">Categories: </label>
                <select name="category" id="categories" value={product.category} required>
                    <option value="">Select Category</option>
                    {
                        categories.map((category)=>(
                            <option value={category._d} key={category._id}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <button type="submit">Create</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
