// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./ProductList";
import AdminDashboard from "./Components/AdminDashboard";
import Layout from "./Components/Layout";
import CartPage from "./pages/CartPage";
import AdminLogin from "./pages/AdminLogin";
import ProtectedRoute from "./Components/ProtectedRoute";
import AdminRegister from "./pages/AdminRegister";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import { WishlistProvider } from "./Components/WishlistContext";
import { CartProvider } from "./Components/CartContext";
import WishlistPage from "./pages/Wishlist";
import CheckOut from "./pages/CheckOut";
import OrderSuccess from "./pages/OrderSuccess";
import CustomerRegister from "./pages/CustomerRegister";
import CustomerLogin from "./pages/CustomerLogin";
import CustomerProfile from "./pages/CustomerProfile";
import { AuthProvider } from "./context/AuthContext";
import AboutPage from "./pages/AboutPage"
import BlogPage from "./pages/BlogPage";

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path="ProductList" element={<ProductList />} />
                <Route path="wishlist" element={<WishlistPage />} />
                <Route path="cart" element={<CartPage />} /> 
                <Route path="/checkout" element={<CheckOut />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/about-page" element={ <AboutPage />} />
                <Route path="/blog-page" element={ <BlogPage />} />
 
                {/* Customer Routes */}
                <Route path="/customer/register" element={<CustomerRegister />} />
                <Route path="/customer/login" element={<CustomerLogin />} />
                <Route 
                  path="/customer/profile" 
                  element={
                    <ProtectedRoute role="customer">
                      <CustomerProfile />
                    </ProtectedRoute>
                  } 
                />
                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Route>

              {/* Admin Routes */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/admin/dashboard" element={
                <ProtectedRoute role="admin">
                  <AdminDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
