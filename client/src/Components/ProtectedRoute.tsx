// src/Components/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import { useEffect, useState, ReactNode } from "react";
import axios from "axios";

interface ProtectedRouteProps {
  children: ReactNode;
  role: "admin" | "customer"; // Role-based protection
}

const ProtectedRoute = ({ children, role }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (role === "admin") {
        await checkAdminAuth();
      } else {
        await checkCustomerAuth();
      }
    };

    checkAuth();
  }, [role]);

  const checkAdminAuth = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const response = await axios.get("http://localhost:5000/api/admin/status", {
        headers: { Authorization: `Bearer ${token}` },
        withCredentials: true,
      });
      setIsAuthenticated(response.status === 200);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const checkCustomerAuth = async () => {
    const token = localStorage.getItem("customerToken");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }
    // Simple token check for customer (JWT exists)
    setIsAuthenticated(true);
  };

  if (isAuthenticated === null) return <p>Loading...</p>;

  return isAuthenticated ? (
    <>{children}</>
  ) : role === "admin" ? (
    <Navigate to="/admin/login" />
  ) : (
    <Navigate to="/customer/login" />
  );
};

export default ProtectedRoute;
