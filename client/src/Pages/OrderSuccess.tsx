// src/Pages/OrderSuccess.tsx
import React from "react";
import { Link } from "react-router-dom";
import "../Styles/orderSuccess.scss" // optional for styling

const OrderSuccess: React.FC = () => {
  return (
    <div className="order-success-container text-center mt-5 slide-in-bck-center ">
      <h1 className="text-success">🎉 Order Confirmed!</h1>
      <p className="fs-5">Thank you for your purchase. Your order is being processed.</p>
      <Link to="/" className="btn btn-primary mt-4">Back to Home</Link>
    </div>
  );
};

export default OrderSuccess;
