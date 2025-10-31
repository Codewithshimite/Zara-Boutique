// src/api/customerProfile.ts
import axios from "axios";
import { PRODUCT_API_BASE_URL } from "../config"; // e.g., https://zaradripsboutique.onrender.com

const token = typeof window !== "undefined" ? localStorage.getItem("customerToken") : null;

export type CustomerProfileDTO = {
  firstName?: string;
  lastName?: string;
  address?: string;
  profilePicture?: string;
};

type JsonBody = Record<string, any>;

const API = axios.create({
  baseURL: PRODUCT_API_BASE_URL, // ✅ no trailing /api
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// ✅ Correct endpoints (your routes.js confirms these exist)
export const getProfile = async (token: string) => {
  const res = await API.get("/api/customers/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

export const updateProfile = async (
  token: string,
  data: FormData | JsonBody
) => {
  const isForm = typeof FormData !== "undefined" && data instanceof FormData;

  const res = await API.put("/api/customers/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
      ...(isForm ? {} : { "Content-Type": "application/json" }),
    },
  });

  return res;
};
