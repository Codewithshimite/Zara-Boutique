import React, { useState, useEffect } from "react";
import { getProfile, updateProfile } from "../api/customerProfile";
import "../Styles/CustomerProfile.scss";

type CustomerShape = {
  firstName?: string;
  lastName?: string;
  address?: string;
  profilePicture?: string; // "/uploads/abc.jpg" or full URL
};

const asCustomer = (val: any): CustomerShape => {
  if (val && typeof val === "object") return val as CustomerShape;
  return { firstName: "", lastName: "", address: "", profilePicture: "" };
};

const CustomerProfile: React.FC = () => {
  const [profile, setProfile] = useState<CustomerShape>({
    firstName: "",
    lastName: "",
    address: "",
    profilePicture: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [isFetching, setIsFetching] = useState(true);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("customerToken") : null;

  useEffect(() => {
    let mounted = true;

    const boot = async () => {
      if (!token) {
        if (mounted) {
          setIsFetching(false);
          setMessage("You’re not logged in.");
        }
        return;
      }
      try {
        const p = await getProfile(token);
        const normalized = asCustomer(p?.data ?? p);
        if (mounted) {
          setProfile({
            firstName: normalized.firstName ?? "",
            lastName: normalized.lastName ?? "",
            address: normalized.address ?? "",
            profilePicture: normalized.profilePicture ?? "",
          });
          setMessage(null);
        }
      } catch (err: any) {
        console.error("Load profile failed:", err);
        if (mounted) setMessage(`Failed to load profile: ${err?.message ?? "Unknown error"}`);
      } finally {
        if (mounted) setIsFetching(false);
      }
    };

    boot();
    return () => {
      mounted = false;
    };
  }, [token]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) {
      setMessage("You’re not logged in.");
      return;
    }

    setLoading(true);
    setMessage(null);

    const firstName = (profile.firstName ?? "").trim();
    const lastName = (profile.lastName ?? "").trim();
    const address = (profile.address ?? "").trim();
    const hasFile = Boolean(file);

    try {
      const updated = await updateProfile(token, {
        firstName: firstName || undefined,
        lastName: lastName || undefined,
        address: address || undefined,
        file: file ?? null,
        // If backend expects snake_case or a different file key, uncomment and adjust:
        // map: { firstName: "first_name", lastName: "last_name", address: "address", file: "avatar" },
        method: hasFile ? "PUT" : "PATCH",
      });

      const normalized = asCustomer(updated?.data ?? updated);
      setProfile({
        firstName: normalized.firstName ?? firstName,
        lastName: normalized.lastName ?? lastName,
        address: normalized.address ?? address,
        profilePicture: normalized.profilePicture ?? profile.profilePicture ?? "",
      });
      setMessage("Profile updated successfully!");
      setFile(null);
    } catch (err: any) {
      console.error("Update failed:", err);
      setMessage(`Failed to update profile: ${err?.message ?? "Unknown error"}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("customerToken");
    } catch {}
    // Use window navigation (no Router required)
    if (typeof window !== "undefined") {
      window.location.href = "/customer/login";
    }
  };

  // Build image src safely
  const pictureSrc = (() => {
    if (file) return URL.createObjectURL(file);
    const pic = profile.profilePicture ?? "";
    if (!pic) return "";
    if (typeof pic !== "string") return "";
    return pic.startsWith("http") ? pic : `http://localhost:5000${pic}`;
  })();

  // No token → show CTA (don’t crash)
  if (!token) {
    return (
      <div className="container mt-5">
        <h2>Customer Profile</h2>
        <p className="text-muted">Please log in to view your profile.</p>
        <button
          className="btn btn-primary"
          onClick={() => (window.location.href = "/customer/login")}
        >
          Go to Login
        </button>
      </div>
    );
  }

  // Loading state
  if (isFetching) {
    return (
      <div className="container mt-5">
        <h2>Loading Profile…</h2>
      </div>
    );
  }

  return (
    <div className="container mt-5 profile-body profile-container">
      <div className="d-flex justify-content-between align-items-center mb-4 profile-header">
        <h2>Customer Profile</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <form onSubmit={handleUpdate} className="d-flex flex-column gap-4 profile-form">
        {/* Profile Picture */}
        <div className="profilePicture">
          <label htmlFor="profilePicture" className="image-label">
            {pictureSrc ? (
              <img
                src={pictureSrc}
                alt="Profile"
                className="rounded-circle profile-image"
              />
            ) : (
              <div className="no-picture">Upload Image</div>
            )}
          </label>

          <input
            id="profilePicture"
            type="file"
            className="d-none"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />
        </div>

        {/* First Name */}
        <div className="profile-field">
          <label htmlFor="firstName">First Name:</label>
          <input
            id="firstName"
            type="text"
            className="form-control"
            value={profile.firstName ?? ""}
            onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
            placeholder="Enter first name"
            required
          />
          <div className="profile-value">{profile.firstName || "-"}</div>
        </div>

        {/* Last Name */}
        <div className="profile-field">
          <label htmlFor="lastName">Last Name:</label>
          <input
            id="lastName"
            type="text"
            className="form-control"
            value={profile.lastName ?? ""}
            onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
            placeholder="Enter last name"
            required
          />
          <div className="profile-value">{profile.lastName || "-"}</div>
        </div>

        {/* Address */}
        <div className="profile-field">
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            type="text"
            className="form-control"
            value={profile.address ?? ""}
            onChange={(e) => setProfile({ ...profile, address: e.target.value })}
            placeholder="Enter address"
          />
          <div className="profile-value">{profile.address || "-"}</div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>

      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
};

export default CustomerProfile;
