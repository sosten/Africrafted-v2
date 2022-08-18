import React, { useState, useContext } from "react";
import { GlobalState } from "../../GlobalState";
import { AiOutlineMenu } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";

const Header = () => {
    return (
        <header>
            <div className="menu">
                <AiOutlineMenu className="menu-icon"/>
            </div>
            <div className="logo">
                <h1>
                    <Link>Africrafted</Link>
                </h1>
            </div>
            <ul>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/login">Login | Register</Link></li>

                <li><FaTimes className="times-icon"/></li>

                <div className="cart-icon">
                    <span>0</span>
                    <Link>
                        <BsCart4 className="shopping-cart-icon" />
                    </Link>
                </div>
            </ul>
        </header>
    )
}

export default Header; 