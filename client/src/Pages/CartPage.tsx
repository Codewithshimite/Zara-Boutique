import React, { useEffect, useState } from "react";
import { useCart } from "../Components/CartContext";
import placeholderImage from "../images/PLI.png"; // Importing a placeholder image
import Loading from "../Components/Loading";
import '../Styles/Cart.scss'
import DeleteButton from "../Components/DeleteButton";
import { useNavigate } from 'react-router-dom';

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string; // Added image property
}

const CartPage: React.FC = () => {
  const { cart, removeFromCart } = useCart();
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showLoadingMessage, setShowLoadingMessage] = useState(false);
  const [showSummary, setShowSummary] = useState(false); // New state for summary visibility
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  }

  
  useEffect(() => {
    fetch("http://localhost:5000/api/products") //my API that is loaded from backend.
      .then((res) => res.json())
      .then((products: Product[]) => {
        const cartProducts = products.filter((product) => cart[product._id]);
        setLoading(false);
        setCartItems(cartProducts);
        
        const total = cartProducts.reduce(
          (sum, product) => sum + product.price * cart[product._id],
          0
        );
        setTotalPrice(total);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [cart]);

  useEffect(() => {
    if (cartItems.length < 1) {
      const timer = setTimeout(() => {
        setShowLoadingMessage(true);
      }, 750); // Delay for 1 second

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    } else {
      setShowLoadingMessage(false); // Reset loading message if there are items in the cart
    }
  }, [cartItems]);

  useEffect(() => {
    if (cartItems.length > 0) {
      const timer = setTimeout(() => {
        setShowSummary(true);
      }, 40); // Delay for 1 second

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    } else {
      setShowSummary(false); // Reset summary visibility if there are no items
    }
  }, [cartItems]);

    if (loading) return <div className="text-center mt-4">
  <Loading />
</div>;

   return (
    <div className="container-fluid mt-5">
      <h1 className="cart-text">Cart</h1>
      
      
       {loading ? (
     <div className="text-center mt-4">
  <Loading />
</div>
     ) : cartItems.length < 1 ? (
      <p className="text-center text-danger fs-5 mt-3">Your Cart is Empty</p>
     ) : (
        
        <div className="row cart-container">
          <div className="col-md-8 cart-product-container">
            {cartItems.map((product) => (
              <div key={product._id} className="item-hill">
                
                  <div className="col-md-4 cart-item-image-div">
                    <img 
                      src={product.image || placeholderImage} 
                      className="img-fluid rounded cart-item-image" 
                      alt={product.name} 
                    />
                  </div>
                  <div className="col-md-8 cart-item-details-div">
                    <h5 className="card-title text-dark cart-item-name">{product.name}</h5>
                    <div className=" text-dark cart-item-detail-price">₦{product.price}</div>
                    <div className="text-dark">Quantity: {cart[product._id]}</div>
                    <DeleteButton onClick={() => removeFromCart(product._id)} />
                  </div>
            
              </div>
            ))}
          </div>
          <>

          <>
  {/* Toggle checkbox (hidden) */}
  <input type="checkbox" id="mobile-summary-toggle" hidden />

  {/* Button to open the summary */}
  <label htmlFor="mobile-summary-toggle" className="mobile-summary-toggle-btn">
    View Summary
  </label>

  {/* Offcanvas Bottom Summary */}
  <div className="offcanvas-bottom-cart">
    <div className="cart-summary mobile-summary">
      <div className="close-toggle bg-transparent">
      <h2 className="summary-text">Summary</h2>
      <input type="checkbox" id="mobile-summary-toggle" hidden />
      <label htmlFor="mobile-summary-toggle" className="mobile-summary-toggle-btn closa">
     X
      </label>
      </div>

      <table className="table-sm text-light bg-light">
        <thead className="cart-summary-thead">
          <tr>
            <th></th>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((product) => {
            const quantity = cart[product._id] || 0;
            return (
              quantity > 0 && (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.image || placeholderImage}
                      className="summary-image"
                      alt={product.name}
                    />
                  </td>
                  <td>{product.name}</td>
                  <td className="item-qty-price">{quantity}</td>
                  <td className="item-qty-price">₦{product.price * quantity}</td>
                </tr>
              )
            );
          })}
        </tbody>
      </table>
      <hr />      
      <p className="fw-bold text-end mt-3 total">Total: ₦{totalPrice}</p>

     
      <button className="btn btn-primary w-100 mt-3" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  </div>
</>

  </>

        </div>


      )}
    </div>
  );
};

export default CartPage;