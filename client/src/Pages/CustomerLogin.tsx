// src/pages/CustomerLogin.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { loginCustomer } from "../api/customerAuth";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../Styles/CustomerLogin.scss";

const CustomerLogin = () => {
  const [email, setEmail] = useState("zaraboutiqueadmin@yopmail.com");
  const [password, setPassword] = useState("Chidubem@1992");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await loginCustomer(email, password);

      console.log("✅ Login response:", data); // 👀 debug
      // ✅ Save token for authenticated requests
      if (data?.token) {
        localStorage.setItem("customerToken", data.token);
      }

      auth?.login?.(data.token);
      navigate("/customer/profile");
    } catch (err: any) {
      console.error("❌ Login error:", err);
      setError(
        err.response?.data?.message ||
          "Login failed. Please check your details."
      );
    }
  };

  return (
    <StyledWrapper className="styler">
      <form onSubmit={handleLogin} className="form_container">
        <div className="logo_container swing-top-fwd">ZB</div>

        <div className="title_container">
          <p className="title">Login to your Account</p>
          <span className="subtitle">
            We are glad to have you in our store. Create an account or login and
            enjoy the experience.
          </span>
        </div>

        <div className="input_container">
          <label className="input_label" htmlFor="email_field">
            Email
          </label>
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
          <label className="input_label" htmlFor="password_field">
            Password
          </label>
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

        <button title="Sign In" type="submit" className="sign-in_btn">
          <span>Sign In</span>
        </button>

        {error && <p className="text-danger mt-3">{error}</p>}
        <div className="mt-4">
          Don’t have an account?{" "}
          <Link to="/customer/register" className="text-blue-500 underline">
            Sign up
          </Link>
        </div>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div``;

export default CustomerLogin;
