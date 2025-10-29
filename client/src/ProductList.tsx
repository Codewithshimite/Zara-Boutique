import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCart } from "../src/Components/CartContext";
import { useWishlist } from "./Components/WishlistContext";
import pic from "./images/PLI.png";
import "../src/Styles/ProductList.scss";

import Checked from "./Components/Checked";

interface Product {
  _id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  image: string;
  description: string;
}

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sortOption, setSortOption] = useState("priceLowHigh");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlist } = useWishlist();
  
useEffect(() => {
  setLoading(true);

  // read the environment variable (works in Vite)
  const API_BASE = import.meta.env.VITE_API_BASE;

  fetch(`${API_BASE}/api/products`)
    .then((res) => {
      if (!res.ok) throw new Error(`Server Error: ${res.status}`);
      return res.json();
    })
    .then((data) => {
      if (!Array.isArray(data)) throw new Error("Expected an array of products");
      setProducts(data);
      setFilteredProducts(data);
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    })
    .finally(() => {
      setLoading(false);
    });
}, []);

  useEffect(() => {
    let filtered = [...products];

    if (categoryFilter !== "All") {
      filtered = filtered.filter((product) => product.category === categoryFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (sortOption === "priceLowHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "priceHighLow") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, categoryFilter, searchTerm, sortOption]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  
  const currentProducts = Array.isArray(filteredProducts)
  ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
  : [];
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const openModal = (product: Product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  const isInWishlist = (productId: string) => {
    return wishlist?.[productId] !== undefined;
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );

    
  return (
    <div className="container mother">
      <div className="arena-holder container">
        <div className="productArena container">
          <input
            type="text"
            className="form-control searcher"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="d-flex align-items-center gap-2 my-3">
            <select
              className="form-select w-auto filter-option"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Shirts">Shirts</option>
              <option value="Trousers">Trousers</option>
              <option value="Shoes">Shoes</option>
            </select>
          </div>

          <div className="d-flex align-items-center gap-2 my-3 sort-option">
            <select
              className="form-select w-auto"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
            >
              <option value="priceLowHigh">Price: Low to High</option>
              <option value="priceHighLow">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="item-holder">
        {currentProducts.map((product) => (
          <div key={product._id} className="item">
            <div className="card name-holderr">
              <img
                src={product.image || pic}
                className="card-img-top"
                alt={product.name}
              />
              <div className="card-body">
                <div className="item-name-title">
                  <h5 className="card-title">{product.name}</h5>
                </div>
                <div className="price-rater">
                  <p className="card-text price">₦{product.price}</p>
                  <p className="card-text">{"⭐".repeat(product.rating)}</p>
                </div>
                <div className="other-buttons">
                  <button
                    className="btn btn-success me-2"
                    title="Add to Cart"
                    onClick={() => addToCart(product._id)}
                  >
                    🛒
                  </button>

                  <button
                    className="btn love"
                    title="Toggle Wishlist"
                    onClick={() =>
                      isInWishlist(product._id)
                        ? removeFromWishlist(product._id)
                        : addToWishlist(product._id)
                    }
                  >
                    {isInWishlist(product._id) ? (
                      <Checked />
                    ) : (
                      <i
                        className={`fas fa-heart heart-outline ${
                          isInWishlist(product._id)
                            ? "text-danger"
                            : "text-light animate"
                        }`}
                      />
                    )}
                  </button>

                  <button
                    className="btn btn-info"
                    title="View Details"
                    onClick={() => openModal(product)}
                  >
                    👁
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <nav>
        <ul className="pagination justify-content-center">
          {Array.from({ length: totalPages }, (_, i) => (
            <li
              key={i}
              className={`page-item ${currentPage === i + 1 ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setCurrentPage(i + 1)}>
                {i + 1}
              </button>
            </li>
          ))}
        </ul>
      </nav>


      {selectedProduct && (
        <div
          className="modal fade show d-block"
          style={{ background: "rgba(0,0,0,0.5)" }}
          role="dialog"
          aria-hidden="false"
          onClick={closeModal}
        >
           <div
            className="modal-dialog modal-lg"
            role="document"
            onClick={(e) => e.stopPropagation()}
           
          >
            <div className="modal-content mode">
              <div className="modal-header plp-modal-head">
                <h5 className="modal-title">{selectedProduct.name}</h5>
              </div>
              <div className="modal-body">
                <div className="plp-modal-image">
                   <img
                  src={selectedProduct.image || pic}
                  alt={selectedProduct.name}
                  className="img-fluid"
                />
                </div>
              
                <div>
                <p className="modal-detail">{selectedProduct.description}</p>
                <p>Price: ₦{selectedProduct.price}</p>
                <p>{"⭐".repeat(selectedProduct.rating)}</p>
                </div>
                
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Close
                </button>
                <button
                  className="btn btn-success"
                  onClick={() => addToCart(selectedProduct._id)}
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
