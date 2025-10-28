// src/pages/CustomerRegister.tsx
import React, { useState } from "react";
import styled from 'styled-components';
import { registerCustomer } from "../api/customerAuth";
import { useNavigate, Link } from "react-router-dom";
import "../Styles/CustomerLogin.scss";

const CustomerRegister = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await registerCustomer(username, email, password);
      navigate("/customer/login");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };


  return (
    <StyledWrapper className="styler">
      <form onSubmit={handleRegister} className="form_container">
        <div className="logo_container swing-top-fwd">ZB</div>
        <div className="title_container">
          <p className="title">Create an Account</p>
          <span className="subtitle">
            Join our store experience by creating an account.
          </span>
        </div>
      
        <div className="input_container">
          <label className="input_label" htmlFor="username_field">Username</label>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input_field"
            id="username_field"
            required
          />
        </div>

        <div className="input_container">
          <label className="input_label" htmlFor="email_field">Email</label>
          <input
            type="email"
            placeholder="name@mail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input_field"
            id="email_field"
            required
          />
        </div>

        <div className="input_container">
          <label className="input_label" htmlFor="password_field">Password</label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input_field"
            id="password_field"
            required
          />
        </div>

        <button title="Register" type="submit" className="sign-in_btn">
          <span>Register</span>
        </button>

        {error && <p className="text-red-500">{error}</p>}

        <div className="mt-4">
          Already have an account? <Link to="/customer/login" className="text-blue-500 underline">Sign in</Link>
        </div>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`/* Your existing CSS styles here */`;

export default CustomerRegister;
