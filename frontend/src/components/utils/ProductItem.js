import React from "react";
import BtnRender from "./BtnRender";

const ProductItem = ({ product, isAdmin, deleteProduct, handleCheck }) => {

  

  return (
    <div className="product_card">
      {isAdmin && <input type={"checkbox"} checked={product.checked} onChange={() => handleCheck(product._id)} />}
      <img src={product.images.url} alt="" />

      <div className="product_box">
        <h2 title={product.title}>{product.title}</h2>
        <span>${product.price}</span>
        <p>{product.description}</p>
      </div>

      <BtnRender product={product} deleteProduct={deleteProduct} />
      {/* <div className="row_btn">
        <Link to="#" id='btn_buy'>Buy</Link>
        <Link to={`/detail/${product._id}`} id='btn_view'>View</Link>
      </div> */}
    </div>
  );
};

export default ProductItem;
