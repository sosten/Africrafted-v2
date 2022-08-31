import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../GlobalState";
import { AiOutlineMenu } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";

const Header = () => {

    const state = useContext(GlobalState);
    const [ isLoggedIn ] = state.UserAPI.isLoggedIn;
    const [ isAdmin ] = state.UserAPI.isAdmin;
    const [ cart ] = state.UserAPI.cart;
    const [menu, setMenu] = useState(false);

    const logoutUser = async () => {
      await axios.get('/api/logout');

      localStorage.removeItem('firstLogin');

      window.location.href="/";
    }


    const adminRouter = () => {
      return(
        <>
          <li><Link to={'/create_product'}>Create Product</Link></li>
          <li><Link to={'/category'}>Categories</Link></li>
        </>
      )
    }

    const loggedInRouter = () => {
      return(
        <>
          <li><Link to={'/history'}>History</Link></li>
          <li><Link to={'/'} onClick={logoutUser}>Logout</Link></li>
        </>
      )
    }

    const styleMenu = {
      left: menu ? 0 : "-100%"
    }

  return (
    <header>
      <div className="menu" onClick={() => setMenu(!menu)}>
        <AiOutlineMenu className="menu-icon" />
      </div>
      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "Africrafted"}</Link>
        </h1>
      </div>
      <ul style={styleMenu}>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>
        { isAdmin && adminRouter() }
        { isLoggedIn ? loggedInRouter() : 
          <li>
            <Link to="/login">Login | Register</Link>
          </li>
        }

        <li onClick={() => setMenu(!menu)}>
          <FaTimes className="times-icon" />
        </li>
        
      </ul>
      { isAdmin ? "" : 
        <div className="cart-icon">
          <span>{ cart.length }</span>
          <Link to="/cart">
            <BsCart4 className="shopping-cart-icon" />
          </Link>
        </div>
        }
    </header>
  );
};

export default Header;
