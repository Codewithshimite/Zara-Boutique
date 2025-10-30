import React, { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

import axios from "axios";

const apiRoute = "/api/users/cart"

interface CartContextType {
  cart: { [key: string]: number };
  cartCount: number;
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<{ [key: string]: number }>({});
  const [cartCount, setCartCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const { token } = useAuth();

  // Load from localStorage + backend cart on mount
  useEffect(() => {
    const loadCart = async () => {
      const local = localStorage.getItem("cart");
      let localCart = local ? JSON.parse(local) : {};

      if (token) {
        try {
          const res = await axios.get<{ productId: { _id: string }; quantity: number }[]>(apiRoute, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const serverCart = res.data.reduce((acc: any, item: any) => {
            acc[item.productId._id] = item.quantity;
            return acc;
          }, {});
          // Merge local + server cart
          const mergedCart: { [key: string]: number } = { ...serverCart };
          for (const id in localCart) {
            mergedCart[id] = (mergedCart[id] || 0) + localCart[id];
          }
          setCart(mergedCart);
        } catch (err) {
          console.error("Failed to fetch cart:", err);
          setCart(localCart);
        }
      } else {
        setCart(localCart);
      }
      setIsLoaded(true);
    };

    loadCart();
  }, [token]);

  // Update cartCount when cart changes
  useEffect(() => {
    setCartCount(Object.values(cart).reduce((acc, count) => acc + count, 0));
  }, [cart]);

  // Sync to localStorage + backend when cart changes
  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem("cart", JSON.stringify(cart));

    if (token) {
      const save = async () => {
        try {
          const cartArray = Object.entries(cart).map(([productId, quantity]) => ({ productId, quantity }));
          await axios.post(apiRoute, { cart: cartArray }, {
            headers: { Authorization: `Bearer ${token}` },
          });
        } catch (err) {
          console.error("Failed to sync cart to server:", err);
        }
      };
      save();
    }
  }, [cart, isLoaded, token]);

  const addToCart = (id: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: (prevCart[id] || 0) + 1,
    }));
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[id] > 1) {
        newCart[id] -= 1;
      } else {
        delete newCart[id];
      }
      return newCart;
    });
  };

  const clearCart = () => {
    setCart({});
  };

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
