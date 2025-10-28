import React, { ReactNode, useState, useEffect } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../Styles/Layout.scss";
import { useCart } from "../Components/CartContext";
import Footer from "../Components/Footer";
import Home from '../navDessigns/HomeNav';
import { useWishlist } from "./WishlistContext";

// ... imports remain the same

const Layout = () => {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount } = useWishlist();

  const toggleMenu = () => setMenuOpen(prev => !prev);
  const closeMenu = () => setMenuOpen(false);

  // useEffect(() => {
  //   // Check if user is logged in (adjust this based on your authentication logic)
  //   const isLoggedIn = localStorage.getItem("authToken"); // Replace with your own logic
  //   if (isLoggedIn) {
  //     navigate("customer/profile");
  //   }else{('/')}
  // }, [navigate]);

  return (
    <div className={`d-flex flex-column whole ${menuOpen ? "menu-open" : ""}`}>
      {/* Header */}
      <header className="container-fluid bg-dark nav-links py-3 headline">
        <div className="container d-flex justify-content-between align-items-center">
          <a className="logo-text nav-links h2 mb-0" href="/">ZaraDrips Boutique</a>

          <button
            className="btn d-md-none nav-links"
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <i className="fa fa-bars fa-lg"></i>
          </button>

          <nav className="d-none d-md-flex align-items-center gap-3">
            <Link to="/" className="nav-links"><Home /></Link>
            <Link to="/ProductList" className="nav-links">Shop</Link>
            <Link to="about-page" className="nav-links">About</Link>
            <Link to="/blog-page" className="nav-links">Blog</Link>
            <Link to="/wishlist" className="nav-links position-relative">
              <i className="fa fa-heart"></i>
              {itemCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle rounded-circle">
                  {itemCount}
                </span>
              )}
            </Link>
            <Link to="/customer/profile" className="nav-links">
              <i className="fa fa-user"></i>
            </Link>
            <button
              className="btn btn-outline-light position-relative"
              onClick={() => navigate('/cart')}
            >
              <i className="fa fa-shopping-cart"></i>
              {cartCount > 0 && (
                <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                  {cartCount}
                </span>
              )}
            </button>
          </nav>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu d-md-none text-center ${menuOpen ? "show" : ""}`}>
          <Link to="/" className="d-block py-2 nav-links" onClick={closeMenu}>Home</Link>
          <Link to="/ProductList" className="d-block py-2 nav-links" onClick={closeMenu}>Shop</Link>
          <Link to="/" className="d-block py-2 nav-links" onClick={closeMenu}>About</Link>
          <Link to="/" className="d-block py-2 nav-links" onClick={closeMenu}>Blog</Link>
          <Link to="/wishlist" className="d-block py-2 nav-links" onClick={closeMenu}>
            <span className="position-relative d-inline-block">
              <i className="fa fa-heart"></i>
              {itemCount > 0 && (
                <span
                  className="badge bg-danger position-absolute top-0 start-100 translate-middle-y rounded-circle"
                  style={{ fontSize: "0.6rem", padding: "0.25em 0.4em" }}
                >
                  {itemCount}
                </span>
              )}
            </span>
          </Link>

          <Link to="/customer/login" className="d-block py-2 nav-links" onClick={closeMenu}>
            <i className="fa fa-user"></i>
          </Link>
          <button
            className="btn btn-outline-light mt-2"
            onClick={() => { closeMenu(); navigate("/cart"); }}
          >
            <i className="fa fa-shopping-cart me-2"></i>
            Cart {cartCount > 0 && `(${cartCount})`}
          </button>
        </div>
      </header>

      {/* Push content down if menu is open */}
      <main className={`container-fluid my-4 ${menuOpen ? "menu-shift" : ""}fills-body`}>
        <Outlet />
      </main>

      <footer className="bg-dark nav-links text-center">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
