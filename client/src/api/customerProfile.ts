import axios, { AxiosRequestConfig, Method } from "axios";
import { API_BASE_URL } from "../config"; // <-- use the base that INCLUDES /api

/**
 * ENV expected:
 *  .env.development  VITE_API_BASE_URL=http://localhost:5000/api
 *  .env.production   VITE_API_BASE_URL=https://zaradripsboutique.onrender.com/api
 *
 * DO NOT append /api in paths below to avoid /api/api duplication.
 */

const API = axios.create({
  baseURL: API_BASE_URL,      // e.g., https://zaradripsboutique.onrender.com/api
  withCredentials: false,
  timeout: 15000,
});

// ---- Shared helpers ---------------------------------------------------------

const withAuth = (token?: string): AxiosRequestConfig => ({
  headers: token ? { Authorization: `Bearer ${token}` } : undefined,
});

/** Try a list of endpoints in order. Skip 404; throw on other errors. */
async function requestWithCandidates<T>(
  method: Method,
  token: string,
  paths: string[],
  data?: any
): Promise<T> {
  let lastErr: any = null;
  for (const p of paths) {
    try {
      const cfg: AxiosRequestConfig = {
        method,
        url: p,
        ...(data !== undefined ? { data } : {}),
        ...withAuth(token),
        // Let axios set multipart boundary automatically when data is FormData
        headers:
          data instanceof FormData
            ? withAuth(token).headers
            : { ...(withAuth(token).headers || {}), "Content-Type": "application/json" },
      };
      const res = await API.request(cfg);
      // Support both {data:{...}} or raw object
      return (res.data?.data ?? res.data) as T;
    } catch (e: any) {
      const status = e?.response?.status;
      if (status === 404) {
        lastErr = e; // try next candidate
        continue;
      }
      throw e; // bubble up non-404 (401, 500, etc.)
    }
  }
  throw lastErr || new Error("Endpoint not found for any candidate path.");
}

// ---- Public API (what your component already uses) --------------------------

export type CustomerProfileDTO = {
  firstName?: string;
  lastName?: string;
  address?: string;
  profilePicture?: string;
};

export const getProfile = async (token: string) => {
  // Put your most-likely route first
  const candidates = [
    "/customers/profile",
    "/customers/me",
    "/users/me",
    "/users/profile",
  ];
  return requestWithCandidates<any>("GET", token, candidates);
};

export const updateProfile = async (
  token: string,
  data: FormData | CustomerProfileDTO
) => {
  const candidates = [
    "/customers/profile",
    "/customers/me",
    "/users/me",
    "/users/profile",
  ];
  return requestWithCandidates<any>("PUT", token, candidates, data);
};
