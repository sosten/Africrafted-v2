import React, { useState, useEffect } from "react";
import axios from "axios";

const userAPI = (token) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/api/infor", {
            headers: { Authorization: token },
          });
          setIsLoggedIn(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
        } catch (err) {
          alert(err.response.data.message);
        }
      };

      getUser();
    }
  }, [token]);

  return {
    isLoggedIn: [isLoggedIn, setIsLoggedIn],
    isAdmin: [isAdmin, setIsAdmin],
  };
};

export default userAPI;
