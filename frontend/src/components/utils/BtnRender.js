import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalState } from "../../GlobalState";

const BtnRender = ({ product }) => {
  const state = useContext(GlobalState);
  const [isAdmin] = state.userAPI.isAdmin;
  const addToCart = state.userAPI.addToCart;

  return (
    <div className="row_btn">
      {isAdmin ? (
        <>
          <Link to="#" id="btn_buy">
            Delete
          </Link>
          <Link to={`/product/${product._id}`} id="btn_view">
            Edit
          </Link>
        </>
      ) : (
        <>
          <Link to="#" id="btn_buy" onClick={()=> addToCart(product)}>
            Buy
          </Link>
          <Link to={`/detail/${product._id}`} id="btn_view">
            View
          </Link>
        </>
      )}
    </div>
  );
};

export default BtnRender;
