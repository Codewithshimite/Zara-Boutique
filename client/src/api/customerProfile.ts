// src/api/customerProfile.ts
import axios from "axios";
import { PRODUCT_API_BASE_URL } from "../config"; // e.g. https://zaradripsboutique.onrender.com

// ✅ Exported type for use in CustomerProfile.tsx
export type CustomerProfileDTO = {
  firstName?: string;
  lastName?: string;
  address?: string;
  profilePicture?: string;
};

type JsonBody = Record<string, any>;

const API = axios.create({
  baseURL: PRODUCT_API_BASE_URL, // e.g., https://zaradripsboutique.onrender.com
  withCredentials: false,
  headers: { "Content-Type": "application/json" },
  timeout: 15000,
});

// ✅ Fetch customer profile
export const getProfile = async (token: string) => {
  const res = await API.get("/api/customers/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res;
};

// ✅ Update customer profile (accepts FormData or JSON)
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
