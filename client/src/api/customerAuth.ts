// src/api/customerAuth.ts
import axios from "axios";

/**
 * BASE URL
 * Set VITE_API_BASE in your frontend .env (e.g., http://localhost:5000/api)
 * Falls back to http://localhost:5000/api for local dev.
 */
const RAW_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";
const BASE = RAW_BASE.replace(/\/+$/, ""); // trim trailing slashes

// Shared axios instance
const API = axios.create({
  baseURL: BASE,
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// ✅ Define a type for expected responses
export interface AuthResponse {
  token: string;
}

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
): Promise<AuthResponse> => {
  const res = await API.post<AuthResponse>("/customers/register", {
    username,
    email,
    password,
  });
  return res.data;
};

/**
 * Login a customer
 * POST /api/customers/login
 */
export const loginCustomer = async (
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res = await API.post<AuthResponse>("/customers/login", { email, password });
  return res.data;
};
