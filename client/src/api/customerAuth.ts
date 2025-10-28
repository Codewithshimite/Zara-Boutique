// src/api/customerAuth.ts
import axios from "axios";

/**
 * BASE URL
 * Set VITE_API_BASE_URL in your frontend .env (e.g., http://localhost:5000/api)
 * Falls back to http://localhost:5000/api for local dev.
 */
const RAW_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";
const BASE = RAW_BASE.replace(/\/+$/, ""); // trim trailing slashes

// Shared axios instance
const API = axios.create({
  baseURL: BASE,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// ---------------------------
// Auth API
// ---------------------------

/**
 * Register a customer
 * POST /api/customers/register
 */
export const registerCustomer = async (
  username: string,
  email: string,
  password: string
) => {
  // IMPORTANT: don't wrap in try/catch so axios errors propagate,
  // allowing your component to use err.response?.data?.message
  const res = await API.post("/customers/register", { username, email, password });
  return res.data;
};

/**
 * Login a customer
 * POST /api/customers/login
 */
export const loginCustomer = async (email: string, password: string) => {
  const res = await API.post("/customers/login", { email, password });
  return res.data;
};
