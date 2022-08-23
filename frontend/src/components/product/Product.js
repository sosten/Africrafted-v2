import React, { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import ProductItem from "../utils/ProductItem";
import LoadingSpinner from "../utils/Loading";

const Product = () => {
  const state = useContext(GlobalState);
  const [product] = state.productAPI.product;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <>
      <div className="product">
        {product.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
            />
          );
        })}
      </div>
      {product.length === 0 && <LoadingSpinner />}
    </>
  );
};

export default Product;
