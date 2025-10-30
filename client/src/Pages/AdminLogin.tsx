import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { PRODUCT_API_BASE_URL } from "../config";

const AdminLogin = () => {
  const [email, setemail] = useState("testerp@yopmail.com");
  const [password, setPassword] = useState("Chidubem@1992");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); // Reset error message

    try {
      const response = await axios.post<{token: string}>(`${PRODUCT_API_BASE_URL}/users/admin/login`, {
        email,
        password,
      });

      const token = response.data.token;
      localStorage.setItem("authToken", token); // Store token for authentication

      navigate("/admin/dashboard"); // Redirect to dashboard on success
    } catch (err) {
      setError("Invalid credentials. Please try again.");
      console.error(err); // Log the error for debugging
    }
  };

  const togglePassword = () => setShowPassword((prev) => !prev);

  return (
    <div className="container mt-5">
      <h2>Admin Login</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label>Email</label>
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3" style={{ position: "relative" }}>
          <label>Password</label>
          <input
            type={showPassword ? "text" : "password"} // Toggle password visibility
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="mt-2"
            onClick={togglePassword}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              cursor: "pointer",
            }}
          >
            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
          </span>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
