import axios from "axios";

// Expect VITE_API_BASE to be like: http://localhost:5000/api
const RAW_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000/api";

// Safe join to avoid double slashes regardless of env formatting
function joinURL(base: string, path: string) {
  return `${base.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

// Your server is mounted at /api/customers  (PLURAL)
const PROFILE_URL = joinURL(RAW_BASE, "/customers/profile");

export const getProfile = async (token: string) => {
  try {
    const res = await axios.get(PROFILE_URL, {
      headers: { Authorization: `Bearer ${token}` },
      withCredentials: false,
    });
    return res.data;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Failed to load profile.";
    // Surface useful info for your UI and console
    console.error("getProfile error:", err?.response?.data || err);
    throw new Error(msg);
  }
};

export const updateProfile = async (token: string, formData: FormData) => {
  try {
    const res = await axios.put(PROFILE_URL, formData, {
      headers: { Authorization: `Bearer ${token}` },
      // DO NOT set Content-Type; axios will add the multipart boundary
      withCredentials: false,
    });
    return res.data;
  } catch (err: any) {
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Failed to update profile.";
    console.error("updateProfile error:", err?.response?.data || err);
    throw new Error(msg);
  }
};
