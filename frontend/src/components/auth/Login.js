import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/api/login", { ...user });

    localStorage.setItem("firstLogin", true);

    window.location.href = "/";

    try {
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div className="login_page">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          value={user.email}
          onChange={onChangeInput}
          placeholder="Email"
          required
        />
        <input
          type="password"
          name="password"
          value={user.password}
          onChange={onChangeInput}
          placeholder="Password"
          required
        />
        <div className="row">
          <button type="submit">Login</button>
          <Link to="/register">Register</Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
