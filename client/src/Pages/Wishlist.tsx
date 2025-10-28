import React, { useEffect, useState } from "react";
import { useCart } from "../Components/CartContext";
import { useWishlist } from "../Components/WishlistContext";
import placeholderImage from "../images/PLI.png";
import Loading from "../Components/Loading";
import "../Styles/Wishlist.scss"
import DeleteButton from "../Components/DeleteButton";
import { PRODUCT_API_BASE_URL } from "../config";




interface Product {
  _id: string;
  name: string;
  price: number;
  image: string;
}


const Wishlist: React.FC = () => {
  const { addToCart } = useCart();
  const { wishlist, removeFromWishlist } = useWishlist();

  const [products, setProducts] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEmptyMessage, setShowEmptyMessage] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
       const response = await fetch(`${PRODUCT_API_BASE_URL}/products`);
        if (!response.ok) throw new Error("Network error");
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) => wishlist[product._id]);
    setWishlistItems(filtered);
  }, [wishlist, products]);

  useEffect(() => {
    if (wishlistItems.length === 0) {
      const timer = setTimeout(() => setShowEmptyMessage(true), 1000);
      return () => clearTimeout(timer);
    } else {
      setShowEmptyMessage(false);
    }
  }, [wishlistItems]);

  const handleAddToCartAndRemove = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: string
  ) => {
    e.preventDefault();
    addToCart(productId);
    removeFromWishlist(productId);
  };

  const handleRemoveFromWishlist = (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: string
  ) => {
    e.preventDefault();
    removeFromWishlist(productId);
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <Loading />
      </div>
    );
  }

  return (
    <>
    <div className="container-fluid mt-4 mt-5">
      <h1 className="text-dark">Wishlist</h1>
      {showEmptyMessage && wishlistItems.length === 0 ? (
        <p className="text-center text-danger fs-5 mt-3">
          Your wishlist is empty.
        </p>
      ) : (
        wishlistItems.map((product) => (
          
          <div key={product._id} className="card  p-3 mb-3 hold-container mt-5">
          
            <div className="row align-items-center  park">
              
              <div className="col-md-8 text-center detail-div">
              <div className="col-md-4 wishlist-image-holder">
                <img
                  src={product.image || placeholderImage}
                  className="img-fluid rounded wishlist-img"
                  alt={product.name}
                />
              </div>
                <div className="item-name-price">
                <h5 className="card-title wishlist-item-name">{product.name}</h5>
                <p className="fw-bold fs-5 wishlist-item-price">₦{product.price}</p>
                </div>
                
                <div className="item-add-remove-btn">
                <button
                  className="btn cart-icon"
                  onClick={(e) => handleAddToCartAndRemove(e, product._id)}
                >
                 🛒
                </button>
                <DeleteButton onClick={(e) => handleRemoveFromWishlist(e, product._id)} />
                </div>
               
              </div>
            </div>
          </div>
        ))
      )}
    </div>
    </>
  );
};

export default Wishlist;
