// src/config.ts

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const PRODUCT_API_BASE_URL =
  import.meta.env.VITE_PRODUCT_API_BASE_URL ||
  "https://zaradripsboutique.onrender.com"; // ✅ Use HTTPS, not HTTP
