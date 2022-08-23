import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("/api/register", { ...user });

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
        <h2>Register</h2>
      <input
          type="text"
          name="name"
          value={user.name}
          onChange={onChangeInput}
          placeholder="Name"
          required
        />
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
          <button type="submit">Register</button>
          <Link to="/login">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
