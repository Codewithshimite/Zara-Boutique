import React, { useEffect, useState } from "react";
import { useCart } from "../Components/CartContext";
import { useNavigate } from "react-router-dom";
import "../Styles/CheckOut.scss";
import Loading from "../Components/Loading";
import { PRODUCT_API_BASE_URL } from "../config";

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}

const CheckOut: React.FC = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [hasFetched, setHasFetched] = useState(false);
  const [showCheckout, setShowCheckout] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const shippingFee = 2000;
  const grandTotal = cartTotal + shippingFee;

  useEffect(() => {
    fetch(`${PRODUCT_API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        setProducts(data);
        const total = data.reduce((acc, product) => {
          const quantity = cart[product._id] || 0;
          return acc + product.price * quantity;
        }, 0);
        setCartTotal(total);
        setHasFetched(true);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [cart]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reference = `OPAY-${Date.now().toString()}`; // Unique transaction reference

    try {
      const response = await fetch(`${PRODUCT_API_BASE_URL}/opay/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotal * 100, // Kobo (₦1 = 100 kobo)
          email,
          name: `${firstName} ${lastName}`,
          reference,
          phoneNumber,
          address,
        }),
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        // Redirect to Opay hosted checkout page
        window.location.href = data.checkoutUrl;
      } else {
        alert("Payment with Opay not available now, Click on 'Contact store to pay' to continue with payment ");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Something went wrong with the payment.");
    }
  };

  return (
    <>
      <div>
        <h1 className="checkout-title mt-5">Checkout</h1>
      </div>

      {showCheckout && (
        <div className={`checkout-container ${!hasFetched ? "hidden" : ""}`}>
          {!hasFetched ? (
            <Loading />
          ) : Object.keys(cart).length === 0 ? (
            <p className="text-center text-danger fs-5">Your cart is empty.</p>
          ) : cartTotal === 0 ? (
            <Loading />
          ) : (
            <>
              <div className="checkout-summary mb-4">
                <h4>Order Summary</h4>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Items Total:</span> <strong>₦{cartTotal}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Shipping Fee:</span> <strong>₦{shippingFee}</strong>
                  </li>
                  <li className="list-group-item d-flex justify-content-between">
                    <span>Grand Total:</span> <strong>₦{grandTotal}</strong>
                  </li>
                </ul>
              </div>

              <form className="checkout-form" onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    className="form-control"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    className="form-control"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="address">Shipping Address</label>
                  <textarea
                    id="address"
                    className="form-control"
                    rows={3}
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-control"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group mb-3">
                  <label htmlFor="phoneNumber">Phone Number</label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    className="form-control"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-success w-100 mt-3">
                  Pay with Opay
                </button>                
              </form>
            
            </>
          )}
        </div>
      )}
  <a href="https://wa.link/tkvhfe" target="_blank" >
  <button 
    type="submit" 
    className="btn btn-success w-100 mt-3"
  >
    Contact store to pay
  </button>
</a>
    </>
  );
};

export default CheckOut;
