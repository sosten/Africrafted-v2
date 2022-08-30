import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
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
  _id: ""
};

const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.CategoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isAdmin] = state.UserAPI.isAdmin;
  const [token] = state.token;

  const history = useHistory();
  const params = useParams();

  const [products] = state.ProductAPI.product;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.ProductAPI.callback;

  useEffect(()=>{
    if(params.id){
      setOnEdit(true);
      products.forEach((product)=>{
        if(product._id === params.id){
          setProduct(product);
          setImages(product.images); 
        } 
      })
    }else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false)
    }
  }, [params.id, products])

  const handleUpload = async (e) => {
    e.preventDefault();
    try{
      if(!isAdmin) return alert("You're not Admin")
      const file = e.target.files[0];
      if(!file) return alert("File does not exist");

      if(file.size > 1024*1024) return alert("File size is too large");
      
      if(file.type !== "image/jpeg" && file.type !== "image/jpg" && file.type !== "image/png")
        return alert("File format not supported");

      let formData = new FormData();
      formData.append("file", file)

      setLoading(true)

      const res = await axios.post("/api/upload", formData, {
        headers: {"content-type" : "multipart/form-data", Authorization: token}
      })

      setLoading(false);
      setImages(res.data);

    } catch(err){
      alert(err.response.data.message);
    }
  }

  const handleDelete = async () => {
    try {
      if(!isAdmin) return alert("You're not Admin")
        setLoading(true)
        await axios.post("/api/destroy", {public_id: images.public_id}, {
          headers: {Authorization: token}
        })
        setLoading(false);
        setImages(false);
      
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  const handleChangeInput = (e) => {
    const {name, value} = e.target
    setProduct({...product, [name]: value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if(!isAdmin) return alert("You're not Admin");
      if(!images) return alert("No Image Uploaded");

      if(onEdit){
        await axios.put(`/api/product/${product._id}`, {...product, images}, {
          headers: {Authorization: token}
      })
      }else {
        await axios.post("/api/product", {...product, images}, {
          headers: {Authorization: token}
        })
      }
      setCallback(!callback);
      history.push("/")
    } catch (err) {
      alert(err.response.data.message)
    }
  }

  const styleUpload = {
    display: images ? "block" : "none"
  }
  return (
    <div className="create_product">
      <div className="upload">
        <input type="file" name="file" id="file_up" onChange={handleUpload}/>
        {
          loading ? <LoadingSpinner /> : (
            <div id="file_img" style={{styleUpload}}>
              <img src={images ? images.url : ""} alt="" />
              <span onClick={handleDelete}>x</span>
            </div>
          )
        }
        
        <form onSubmit={handleSubmit}>
          <div className="row">
            <label htmlFor="product_id">Product ID</label>
            <input
              type="text"
              name="product_id"
              id="product_id"
              value={product.product_id}
              onChange={handleChangeInput}
              required
              disabled={onEdit}
            />
          </div>
          <div className="row">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title" 
              id="title"
              value={product.title}
              onChange={handleChangeInput}
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
              onChange={handleChangeInput}
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
                    onChange={handleChangeInput}
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
                    onChange={handleChangeInput}
                    required
                    rows={7}
                />
            </div>
            <div className="row">
                <label htmlFor="categories">Categories: </label>
                <select name="category" id="categories" value={product.category} onChange={handleChangeInput} required>
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
            <button type="submit">{onEdit ? "Update" : "Create"}</button>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
