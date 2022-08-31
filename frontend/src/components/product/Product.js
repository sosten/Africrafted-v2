import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import ProductItem from "../utils/ProductItem";
import LoadingSpinner from "../utils/Loading";
import axios from "axios";
import Filters from "../filters/Filters";
import LoadMore from "../filters/LoadMore";

const Product = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = state.ProductAPI.product;
  const [isAdmin] = state.UserAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.ProductAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const handleCheck = (id) => {
    product.forEach((product)=>{
      if(product._id === id) product.checked = !product.checked
    })

    setProduct([...product]);
  }

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = await axios.post('/api/destroy', {public_id}, {
        headers: {Authorization: token}
      })

      const deleteProduct = await axios.delete(`/api/product/${id}`, {
        headers: {Authorization: token}
      })

      await destroyImg
      await deleteProduct
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.message);
    }
  }

  const checkAll = () => {
    product.forEach((product) => {
      product.checked = !isChecked
    }) 
    setProduct([...product]);
    setIsChecked(!isChecked);
  }

  deleteAll = () => {
    product.forEach((product) => {
      if(product.checked) deleteProduct(product._id, product.images.public_id)
    })
  }

  if(loading) return <LoadingSpinner /> 

  return (
    <>
      <Filters />
      {
        isAdmin &&
        <div className="delete_all">
          <span>Select All</span>
          <input type="checkbox" checked ={isChecked} onChange={checkAll} />
          <button onClick={deleteAll}>Delete All</button>
        </div>
      }
      <div className="product">
        {product.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          );
        })}
      </div>
      <LoadMore />
      {product.length === 0 && <LoadingSpinner />}
    </>
  );
};

export default Product;
