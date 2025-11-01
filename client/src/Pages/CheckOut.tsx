import React, { useEffect, useMemo, useState } from "react";
import { useCart } from "../Components/CartContext";
import { useNavigate } from "react-router-dom";
import "../Styles/CheckOut.scss";
import Loading from "../Components/Loading";
import { PRODUCT_API_BASE_URL } from "../config";

interface Product {
  _id?: string;
  id?: string;
  name: string;
  price: number;
  image: string;
}

const getPid = (p: Product) => (p._id ?? p.id ?? "").toString();

const CheckOut: React.FC = () => {
  const { cart, clearCart, isLoaded } = useCart(); // <— use isLoaded
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [hasFetched, setHasFetched] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");

  const shippingFee = 2000;

  // Fetch products once
  useEffect(() => {
    let isMounted = true;
    fetch(`${PRODUCT_API_BASE_URL}/products`)
      .then((res) => res.json())
      .then((data: Product[]) => {
        if (!isMounted) return;
        setProducts(Array.isArray(data) ? data : []);
        setHasFetched(true);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setHasFetched(true);
      });
    return () => { isMounted = false; };
  }, []);

  // Join cart + products safely
  const { cartItems, cartTotal } = useMemo(() => {
    const map = new Map<string, Product>();
    for (const p of products) map.set(getPid(p), p);

    const items = Object.entries(cart).map(([pid, qty]) => {
      const product = map.get(pid);
      return product ? { product, qty } : null;
    }).filter(Boolean) as { product: Product; qty: number }[];

    const total = items.reduce((acc, it) => acc + (it.product.price * it.qty), 0);
    return { cartItems: items, cartTotal: total };
  }, [products, cart]);

  const grandTotal = cartTotal + (cartTotal > 0 ? shippingFee : 0);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reference = `OPAY-${Date.now().toString()}`;
    try {
      const response = await fetch(`${PRODUCT_API_BASE_URL}/opay/initiate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: grandTotal * 100,
          email,
          name: `${firstName} ${lastName}`,
          reference,
          phoneNumber,
          address,
        }),
      });
      const data = await response.json();
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        alert("Payment with Opay not available now, Click on 'Contact store to pay' to continue with payment ");
      }
    } catch (error) {
      console.error("Payment initiation error:", error);
      alert("Something went wrong with the payment.");
    }
  };

  // Gate rendering until both product list and cart have loaded
  if (!isLoaded || !hasFetched) {
    return <Loading />;
  }

  const isEmpty = cartItems.length === 0;

  return (
    <>
      <div><h1 className="checkout-title mt-5">Checkout</h1></div>

      <div className="checkout-container">
        {isEmpty ? (
          <p className="text-center text-danger fs-5">Your cart is empty.</p>
        ) : (
          <>
            {/* Line items */}
            <div className="mb-4">
              <h4>Your Items</h4>
              <ul className="list-group">
                {cartItems.map(({ product, qty }) => (
                  <li key={getPid(product)} className="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                      {product.name} × {qty}
                    </span>
                    <strong>₦{product.price * qty}</strong>
                  </li>
                ))}
              </ul>
            </div>

            {/* Summary */}
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

            {/* Form */}
            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" className="form-control" required
                  value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <label htmlFor="lastName" className="mt-2">Last Name</label>
                <input type="text" id="lastName" className="form-control" required
                  value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="address">Shipping Address</label>
                <textarea id="address" className="form-control" rows={3} required
                  value={address} onChange={(e) => setAddress(e.target.value)} />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="form-control" required
                  value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>

              <div className="form-group mb-3">
                <label htmlFor="phoneNumber">Phone Number</label>
                <input type="tel" id="phoneNumber" className="form-control" required
                  value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </div>

              <button type="submit" className="btn btn-success w-100 mt-3">
                Pay with Opay
              </button>
            </form>
          </>
        )}
      </div>

      <a href="https://wa.link/tkvhfe" target="_blank" rel="noreferrer">
        <button type="button" className="btn btn-success w-100 mt-3">
          Contact store to pay
        </button>
      </a>
    </>
  );
};

export default CheckOut;
