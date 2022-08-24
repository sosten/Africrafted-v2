import React, { useState, useEffect } from "react";
import axios from "axios";

const userAPI = (token) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([])

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/api/infor", {
            headers: { Authorization: token },
          });
          setIsLoggedIn(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
          setCart(res.data.cart);
        } catch (err) {
          alert(err.response.data.message);
        }
      };

      getUser();
    }
  }, [token]);

  const addToCart = async (product) => {
    if(!isLoggedIn) return alert("You have to login to continue shopping");
    const check = cart.every(item =>{
      return item._id !== product._id
    })

    if(check){
      setCart([...cart, {...product, quantity: 1}])
      await axios.patch('/api/add_to_cart', {cart: [...cart, {...product, quantity: 1}]},{
        headers: {Authorization: token}
      })
    }else {
      alert("Product added to cart")
    }
  }

  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    isAdmin: [isAdmin, setIsAdmin],
    cart: [cart, setCart],
    addToCart: addToCart
  };
};

export default userAPI;
